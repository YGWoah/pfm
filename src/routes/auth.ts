import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Article } from '@prisma/client';
const jwt = require('jsonwebtoken');
import { generateAccessToken } from '../utils/generateAccesToken';
import { authenticate } from '../middleware/authenticate';
const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
  let { email, password } = req.body;

  prisma.user
    .findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        email: true,
      },
    })
    .then((user) => {
      if (!user) {
        res.json({ error: 'user not found' });
        return;
      }
      if (user?.password === password) {
        let token = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        res.json({
          logged: true,
          userId: user?.id,
          token: token,
        });
      } else {
        res.json({ error: 'wrong password' });
      }
    })
    .catch((error) => {
      console.log(error);

      res.json({ error: 'user not found' });
    });
});

router.get(
  '/isLoggedIn',
  authenticate,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'protected' });
  }
);

export default router;
