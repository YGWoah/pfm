import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      const secret = process.env.JWT_SECRET;

      const cleanedToken = token.replace(/"/g, '');

      try {
        const decoded = jwt.verify(cleanedToken, secret);
        if (decoded) {
          return next();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return res.status(401).json({ message: 'Unauthorized' });
}
