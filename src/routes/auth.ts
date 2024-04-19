import express, { Request, Response, NextFunction } from 'express';
import { Article } from '@prisma/client';
import prisma from '../../prisma/prisma';
const jwt = require('jsonwebtoken');
import { generateAccessToken } from '../utils/generateAccesToken';
import { authenticate } from '../middleware/authenticate';
import { comparePasswords } from '../utils/passwordUtils';
const router = express.Router();
import { User } from '@prisma/client';
import { hashPassword } from '../utils/passwordUtils';

router.post('/login', async (req: Request, res: Response) => {
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
    .then(async (user) => {
      if (!user) {
        res.status(404).json({ error: 'user not found' });
        return;
      }
      let passwordsMatch = await comparePasswords(
        password,
        user.password
      );
      if (passwordsMatch) {
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
        res.status(401).json({ error: 'wrong password' });
      }
    })
    .catch((error) => {
      console.log(error);

      res.status(404).json({ error: 'user not found' });
    });
});

router.post('/register', async (req: Request, res: Response) => {
  let { name, email, password } = req.body;

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Email is not valid' });
    return;
  }
  if (password?.length < 8) {
    res.json({ error: 'Password is too short' });
    return;
  }
  if (name?.length < 4) {
    res.json({ error: 'Name is too short' });
    return;
  }
  let hashedPassword = await hashPassword(password);
  console.log(hashedPassword.length);

  prisma.user
    .create({
      data: {
        nom: name, // i need to check if the name is unique
        email: email, // i need to check if the email is unique
        password: hashedPassword, //i need to hash the password
      },
    })
    .then((user: User | null) => {
      res.json(user);
    })
    .catch((error: any) => {
      console.log(error);
      res.json(error);
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
