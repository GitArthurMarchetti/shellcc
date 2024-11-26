// src/routes/rooms.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../database/config.js';
import crypto from 'crypto';

const router = express.Router();

// Criar uma nova sala
router.post('/', authenticateToken, async (req, res) => {
     const client = await pool.connect();
     try {
          await client.query('BEGIN');
          const { title, description, colorTheme, maxMembers } = req.body;
          const userId = req.user.userId;

          // Criar a sala
          const roomResult = await client.query(
               `INSERT INTO rooms (title, description, color_theme, owner_id, max_members) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, title, description, color_theme, max_members`,
               [title, description, colorTheme, userId, maxMembers]
          );

          // Adicionar o criador como membro/owner
          await client.query(
               `INSERT INTO room_members (room_id, user_id, role, status) 
             VALUES ($1, $2, 'owner', 'active')`,
               [roomResult.rows[0].id, userId]
          );

          await client.query('COMMIT');

          res.status(201).json({
               message: 'Sala criada com sucesso',
               room: roomResult.rows[0]
          });
     } catch (error) {
          await client.query('ROLLBACK');
          console.error('Erro ao criar sala:', error);
          res.status(500).json({ error: 'Erro ao criar sala' });
     } finally {
          client.release();
     }
});

// Listar salas do usuário
router.get('/', authenticateToken, async (req, res) => {
     try {
          const userId = req.user.userId;

          const result = await pool.query(
               `SELECT r.*, rm.role, rm.status,
                    (SELECT COUNT(*) FROM room_members WHERE room_id = r.id AND status = 'active') as member_count
             FROM rooms r
             INNER JOIN room_members rm ON r.id = rm.room_id
             WHERE rm.user_id = $1
             ORDER BY r.created_at DESC`,
               [userId]
          );

          res.json(result.rows);
     } catch (error) {
          console.error('Erro ao listar salas:', error);
          res.status(500).json({ error: 'Erro ao listar salas' });
     }
});

// Obter detalhes de uma sala específica
router.get('/:id', authenticateToken, async (req, res) => {
     try {
          const roomId = req.params.id;
          const userId = req.user.userId;

          // Verificar se o usuário é membro da sala
          const memberCheck = await pool.query(
               'SELECT role FROM room_members WHERE room_id = $1 AND user_id = $2',
               [roomId, userId]
          );

          if (memberCheck.rows.length === 0) {
               return res.status(403).json({ error: 'Acesso negado' });
          }

          // Buscar detalhes da sala
          const roomResult = await pool.query(
               `SELECT r.*, 
                    (SELECT COUNT(*) FROM room_members WHERE room_id = r.id AND status = 'active') as member_count
             FROM rooms r
             WHERE r.id = $1`,
               [roomId]
          );

          // Buscar membros da sala
          const membersResult = await pool.query(
               `SELECT rm.role, rm.status, u.id, u.name, u.email
             FROM room_members rm
             INNER JOIN users u ON rm.user_id = u.id
             WHERE rm.room_id = $1
             ORDER BY rm.created_at`,
               [roomId]
          );

          const room = {
               ...roomResult.rows[0],
               members: membersResult.rows
          };

          res.json(room);
     } catch (error) {
          console.error('Erro ao buscar detalhes da sala:', error);
          res.status(500).json({ error: 'Erro ao buscar detalhes da sala' });
     }
});

// Gerar convite para a sala
router.post('/:id/invite', authenticateToken, async (req, res) => {
     try {
          const roomId = req.params.id;
          const userId = req.user.userId;
          const { email } = req.body;

          // Verificar se o usuário tem permissão (owner ou admin)
          const memberCheck = await pool.query(
               "SELECT role FROM room_members WHERE room_id = $1 AND user_id = $2 AND role IN ('owner', 'admin')",
               [roomId, userId]
          );

          if (memberCheck.rows.length === 0) {
               return res.status(403).json({ error: 'Sem permissão para convidar' });
          }

          // Gerar token único
          const token = crypto.randomBytes(32).toString('hex');
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias

          await pool.query(
               'INSERT INTO room_invites (room_id, email, token, expires_at) VALUES ($1, $2, $3, $4)',
               [roomId, email, token, expiresAt]
          );

          // Aqui você poderia implementar o envio de email com o link de convite

          res.json({
               message: 'Convite gerado com sucesso',
               inviteLink: `httṕ://localhost:5173/join-room/${token}`
          });
     } catch (error) {
          console.error('Erro ao gerar convite:', error);
          res.status(500).json({ error: 'Erro ao gerar convite' });
     }
});

// Aceitar convite para a sala
router.post('/join/:token', authenticateToken, async (req, res) => {
     const client = await pool.connect();
     try {
          await client.query('BEGIN');

          const { token } = req.params;
          const userId = req.user.userId;

          // Verificar se o convite existe e é válido
          const inviteResult = await client.query(
               'SELECT * FROM room_invites WHERE token = $1 AND expires_at > NOW()',
               [token]
          );

          if (inviteResult.rows.length === 0) {
               return res.status(400).json({ error: 'Convite inválido ou expirado' });
          }

          const invite = inviteResult.rows[0];

          // Verificar se já é membro
          const memberCheck = await client.query(
               'SELECT id FROM room_members WHERE room_id = $1 AND user_id = $2',
               [invite.room_id, userId]
          );

          if (memberCheck.rows.length > 0) {
               return res.status(400).json({ error: 'Você já é membro desta sala' });
          }

          // Verificar limite de membros
          const roomResult = await client.query(
               `SELECT max_members, 
                    (SELECT COUNT(*) FROM room_members WHERE room_id = rooms.id AND status = 'active') as current_members
             FROM rooms WHERE id = $1`,
               [invite.room_id]
          );

          const room = roomResult.rows[0];
          if (room.current_members >= room.max_members) {
               return res.status(400).json({ error: 'Sala está cheia' });
          }

          // Adicionar usuário como membro
          await client.query(
               'INSERT INTO room_members (room_id, user_id, role, status) VALUES ($1, $2, $3, $4)',
               [invite.room_id, userId, 'member', 'active']
          );

          // Deletar o convite usado
          await client.query('DELETE FROM room_invites WHERE token = $1', [token]);

          await client.query('COMMIT');

          res.json({ message: 'Bem-vindo à sala!' });
     } catch (error) {
          await client.query('ROLLBACK');
          console.error('Erro ao entrar na sala:', error);
          res.status(500).json({ error: 'Erro ao entrar na sala' });
     } finally {
          client.release();
     }
});

export default router;