import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom interface for the decoded token data
interface DecodedToken extends JwtPayload {
  // Add any additional properties you expect in the decoded token
  userId: string;
  role: string;
}

// Augment the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

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
      if (!secret) {
        throw new Error('JWT_SECRET is not defined');
      }
      try {
        const decoded = jwt.verify(
          cleanedToken,
          secret
        ) as DecodedToken;
        console.log(decoded);

        if (decoded) {
          req.user = decoded;
          return next();
        }
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          res.status(401).json({ message: 'Token expired' });
          console.log('Token expired');
          return;
        }
      }
    }
  }
  return res.status(401).json({ message: 'Unauthorized' });
}
