import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'Shellc';

export const authenticateToken = (req, res, next) => {
     try {
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1];

          if (!token) {
               return res.status(401).json({ error: 'Token não fornecido' });
          }

          const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
          next();
     } catch (error) {
          return res.status(403).json({ error: 'Token inválido' });
     }
};

