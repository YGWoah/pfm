import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Article } from '@prisma/client';

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
      },
    })
    .then((user) => {
      if (user?.password === password) {
        res.json({
          logged: true,
          userId: user?.id,
          token: 'token',
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

export default router;
