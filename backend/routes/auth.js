
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/config.js';
import { authenticateToken, JWT_SECRET } from '../middleware/auth.js';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
     try {
          const { name, email, password } = req.body;

          // Validar campos
          if (!name || !email || !password) {
               return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
          }

          // Verificar se email já existe
          const userExists = await pool.query(
               'SELECT id FROM users WHERE email = $1',
               [email]
          );

          if (userExists.rows.length > 0) {
               return res.status(400).json({ error: 'Email já cadastrado' });
          }

          // Hash da senha
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // Inserir usuário
          const result = await pool.query(
               'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
               [name, email, hashedPassword]
          );

          const user = result.rows[0];
          const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

          res.status(201).json({
               message: 'Usuário cadastrado com sucesso',
               token,
               user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
               }
          });

     } catch (error) {
          console.error('Erro no registro:', error);
          res.status(500).json({ error: 'Erro interno do servidor' });
     }
});

// Login
router.post('/login', async (req, res) => {
     try {
          const { email, password } = req.body;

          // Validar campos
          if (!email || !password) {
               return res.status(400).json({ error: 'Email e senha são obrigatórios' });
          }

          // Buscar usuário
          const result = await pool.query(
               'SELECT id, name, email, password FROM users WHERE email = $1',
               [email]
          );

          if (result.rows.length === 0) {
               return res.status(401).json({ error: 'Email ou senha inválidos' });
          }

          const user = result.rows[0];

          // Verificar senha
          const validPassword = await bcrypt.compare(password, user.password);

          if (!validPassword) {
               return res.status(401).json({ error: 'Email ou senha inválidos' });
          }

          // Gerar token
          const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

          res.json({
               message: 'Login realizado com sucesso',
               token,
               user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
               }
          });

     } catch (error) {
          console.error('Erro no login:', error);
          res.status(500).json({ error: 'Erro interno do servidor' });
     }
});

// Verificar token
router.get('/verify', authenticateToken, (req, res) => {
     res.json({ valid: true });
});

export default router;
