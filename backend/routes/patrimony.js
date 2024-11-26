// src/routes/patrimony.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../database/config.js';

const router = express.Router();

// CRUD Categorias
router.post('/categories', authenticateToken, async (req, res) => {
     try {
          const { name, default_devaluation, room_id } = req.body;

          const result = await pool.query(
               `INSERT INTO categories (name, default_devaluation, room_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
               [name, default_devaluation, room_id]
          );

          res.status(201).json(result.rows[0]);
     } catch (error) {
          console.error('Erro ao criar categoria:', error);
          res.status(500).json({ error: 'Erro ao criar categoria' });
     }
});

router.get('/categories/:roomId', authenticateToken, async (req, res) => {
     try {
          const { roomId } = req.params;

          const result = await pool.query(
               'SELECT * FROM categories WHERE room_id = $1 ORDER BY name',
               [roomId]
          );

          res.json(result.rows);
     } catch (error) {
          console.error('Erro ao listar categorias:', error);
          res.status(500).json({ error: 'Erro ao listar categorias' });
     }
});

router.put('/categories/:id', authenticateToken, async (req, res) => {
     try {
          const { id } = req.params;
          const { name, default_devaluation } = req.body;

          const result = await pool.query(
               `UPDATE categories
             SET name = COALESCE($1, name),
                 default_devaluation = COALESCE($2, default_devaluation),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $3
             RETURNING *`,
               [name, default_devaluation, id]
          );

          if (result.rows.length === 0) {
               return res.status(404).json({ error: 'Categoria não encontrada' });
          }

          res.json(result.rows[0]);
     } catch (error) {
          console.error('Erro ao atualizar categoria:', error);
          res.status(500).json({ error: 'Erro ao atualizar categoria' });
     }
});

// src/routes/patrimony.js (continuação)

router.delete('/categories/:id', authenticateToken, async (req, res) => {
     try {
          const { id } = req.params;

          const result = await pool.query(
               'DELETE FROM categories WHERE id = $1 RETURNING *',
               [id]
          );

          if (result.rows.length === 0) {
               return res.status(404).json({ error: 'Categoria não encontrada' });
          }

          res.json({ message: 'Categoria excluída com sucesso' });
     } catch (error) {
          console.error('Erro ao excluir categoria:', error);
          res.status(500).json({ error: 'Erro ao excluir categoria' });
     }
});

// CRUD Patrimônios
router.post('/', authenticateToken, async (req, res) => {
     const client = await pool.connect();
     try {
          await client.query('BEGIN');

          const {
               name, description, code, location,
               initial_value, lifespan, devaluation_rate,
               category_id, room_id, purchase_date
          } = req.body;

          // Converter valores para números
          const initialValueNum = parseFloat(initial_value);
          const devalRateNum = parseFloat(devaluation_rate) / 100;

          // Calcular valor atual
          const currentDate = new Date();
          const purchaseDateTime = new Date(purchase_date);
          const yearsDiff = (currentDate.getTime() - purchaseDateTime.getTime()) / (1000 * 60 * 60 * 24 * 365);
          const currentValue = initialValueNum * Math.pow(1 - devalRateNum, yearsDiff);

          const result = await client.query(
               `INSERT INTO patrimonies (
                 name, description, code, location,
                 initial_value, current_value, lifespan,
                 devaluation_rate, category_id, room_id,
                 purchase_date
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING *`,
               [name, description, code, location,
                    initialValueNum, currentValue, lifespan,
                    devaluation_rate, category_id, room_id,
                    purchase_date]
          );

          await client.query('COMMIT');

          // Converter valores para números antes de enviar resposta
          const patrimony = {
               ...result.rows[0],
               initial_value: parseFloat(result.rows[0].initial_value),
               current_value: parseFloat(result.rows[0].current_value),
               devaluation_rate: parseFloat(result.rows[0].devaluation_rate)
          };

          res.status(201).json(patrimony);
     } catch (error) {
          await client.query('ROLLBACK');
          console.error('Erro ao criar patrimônio:', error);
          res.status(500).json({ error: 'Erro ao criar patrimônio' });
     } finally {
          client.release();
     }
});

router.post('/:patrimonioId/expenses', authenticateToken, async (req, res) => {
     try {
          const { patrimonioId } = req.params;
          const { description, value, date } = req.body;

          const result = await pool.query(
               `INSERT INTO patrimony_expenses 
                 (patrimony_id, description, value, date)
              VALUES ($1, $2, $3, $4)
              RETURNING *`,
               [patrimonioId, description, value, date]
          );

          res.status(201).json(result.rows[0]);
     } catch (error) {
          console.error('Erro ao adicionar gasto:', error);
          res.status(500).json({ error: 'Erro ao adicionar gasto' });
     }
});

router.get('/:patrimonioId/expenses', authenticateToken, async (req, res) => {
     try {
          const { patrimonioId } = req.params;

          const result = await pool.query(
               `SELECT * FROM patrimony_expenses
              WHERE patrimony_id = $1
              ORDER BY date DESC`,
               [patrimonioId]
          );

          res.json(result.rows);
     } catch (error) {
          console.error('Erro ao listar gastos:', error);
          res.status(500).json({ error: 'Erro ao listar gastos' });
     }
});


router.put('/expenses/:expenseId', authenticateToken, async (req, res) => {
     try {
          const { expenseId } = req.params;
          const { description, value, date } = req.body;

          const result = await pool.query(
               `UPDATE patrimony_expenses
              SET description = COALESCE($1, description),
                  value = COALESCE($2, value),
                  date = COALESCE($3, date),
                  updated_at = CURRENT_TIMESTAMP
              WHERE id = $4
              RETURNING *`,
               [description, value, date, expenseId]
          );

          if (result.rows.length === 0) {
               return res.status(404).json({ error: 'Gasto não encontrado' });
          }

          res.json(result.rows[0]);
     } catch (error) {
          console.error('Erro ao atualizar gasto:', error);
          res.status(500).json({ error: 'Erro ao atualizar gasto' });
     }
});

router.delete('/expenses/:expenseId', authenticateToken, async (req, res) => {
     try {
          const { expenseId } = req.params;

          const result = await pool.query(
               'DELETE FROM patrimony_expenses WHERE id = $1 RETURNING *',
               [expenseId]
          );

          if (result.rows.length === 0) {
               return res.status(404).json({ error: 'Gasto não encontrado' });
          }

          res.json({ message: 'Gasto excluído com sucesso' });
     } catch (error) {
          console.error('Erro ao excluir gasto:', error);
          res.status(500).json({ error: 'Erro ao excluir gasto' });
     }
});

router.get('/category/:categoryId', authenticateToken, async (req, res) => {
     try {
          const { categoryId } = req.params;

          const result = await pool.query(
               `SELECT p.*, c.name as category_name, c.default_devaluation
              FROM patrimonies p
              JOIN categories c ON p.category_id = c.id
              WHERE p.category_id = $1
              ORDER BY p.name`,
               [categoryId]
          );

          const updatedPatrimonies = result.rows.map(patrimony => {
               // Garantir que os valores são números
               const initialValue = parseFloat(patrimony.initial_value);
               const currentDate = new Date();
               const purchaseDate = new Date(patrimony.purchase_date);
               const yearsDiff = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
               const devalRate = parseFloat(patrimony.devaluation_rate) / 100;
               const currentValue = initialValue * Math.pow(1 - devalRate, yearsDiff);

               return {
                    ...patrimony,
                    initial_value: initialValue,
                    current_value: parseFloat(currentValue.toFixed(2)),
                    devaluation_rate: parseFloat(patrimony.devaluation_rate)
               };
          });

          res.json(updatedPatrimonies);
     } catch (error) {
          console.error('Erro ao listar patrimônios:', error);
          res.status(500).json({ error: 'Erro ao listar patrimônios' });
     }
});

router.put('/:id', authenticateToken, async (req, res) => {
     const client = await pool.connect();
     try {
          await client.query('BEGIN');

          const { id } = req.params;
          const {
               name, description, code, location,
               initial_value, lifespan, devaluation_rate,
               purchase_date
          } = req.body;

          // Recalcula o valor atual se necessário
          let updateFields = [];
          let values = [];
          let valueIndex = 1;

          if (name) {
               updateFields.push(`name = $${valueIndex}`);
               values.push(name);
               valueIndex++;
          }
          if (description !== undefined) {
               updateFields.push(`description = $${valueIndex}`);
               values.push(description);
               valueIndex++;
          }
          if (code) {
               updateFields.push(`code = $${valueIndex}`);
               values.push(code);
               valueIndex++;
          }
          if (location) {
               updateFields.push(`location = $${valueIndex}`);
               values.push(location);
               valueIndex++;
          }
          if (initial_value) {
               updateFields.push(`initial_value = $${valueIndex}`);
               values.push(initial_value);
               valueIndex++;
          }
          if (lifespan) {
               updateFields.push(`lifespan = $${valueIndex}`);
               values.push(lifespan);
               valueIndex++;
          }
          if (devaluation_rate) {
               updateFields.push(`devaluation_rate = $${valueIndex}`);
               values.push(devaluation_rate);
               valueIndex++;
          }
          if (purchase_date) {
               updateFields.push(`purchase_date = $${valueIndex}`);
               values.push(purchase_date);
               valueIndex++;
          }

          if (updateFields.length === 0) {
               return res.status(400).json({ error: 'Nenhum campo para atualizar' });
          }

          const queryText = `
             UPDATE patrimonies
             SET ${updateFields.join(', ')},
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $${valueIndex}
             RETURNING *
         `;

          values.push(id);
          const result = await client.query(queryText, values);

          if (result.rows.length === 0) {
               await client.query('ROLLBACK');
               return res.status(404).json({ error: 'Patrimônio não encontrado' });
          }

          await client.query('COMMIT');
          res.json(result.rows[0]);
     } catch (error) {
          await client.query('ROLLBACK');
          console.error('Erro ao atualizar patrimônio:', error);
          res.status(500).json({ error: 'Erro ao atualizar patrimônio' });
     } finally {
          client.release();
     }
});

router.delete('/:id', authenticateToken, async (req, res) => {
     try {
          const { id } = req.params;

          const result = await pool.query(
               'DELETE FROM patrimonies WHERE id = $1 RETURNING *',
               [id]
          );

          if (result.rows.length === 0) {
               return res.status(404).json({ error: 'Patrimônio não encontrado' });
          }

          res.json({ message: 'Patrimônio excluído com sucesso' });
     } catch (error) {
          console.error('Erro ao excluir patrimônio:', error);
          res.status(500).json({ error: 'Erro ao excluir patrimônio' });
     }
});

export default router;