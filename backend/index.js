// src/index.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/rooms.js';
import patrimonyRoutes from './routes/patrimony.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/patrimonies', patrimonyRoutes);

const PORT = 3000;

app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
});