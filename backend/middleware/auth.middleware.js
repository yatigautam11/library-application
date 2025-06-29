import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

export const requireAdmin = (req, res, next) => {
  if (req.user?.email !== ADMIN_EMAIL) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'No token provided. Please login.' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token. Please login.' });
    req.user = user;
    next();
  });
};

export default verifyToken;
