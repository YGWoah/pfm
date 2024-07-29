import { Request, Response } from 'express';
import prisma from '../../prisma/prisma';
import { generateAccessToken } from '../utils/generateAccesToken';
import { comparePasswords } from '../utils/passwordUtils';
import { User } from '@prisma/client';
import { hashPassword } from '../utils/passwordUtils';

import UserModel from '../model/user.model';

const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  UserModel.getUserByEmail(email)
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
};

const register = async (req: Request, res: Response) => {
  let { name, email, password, description } = req.body;

  console.log(description);

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

  UserModel.createUser(name, email, hashedPassword, description)
    .then((user: User | null) => {
      res.json(user);
    })
    .catch((error: any) => {
      console.log(error);
      res.json(error);
    });
};

const isLoggedIn = (req: Request, res: Response) => {
  res.status(200).json({ message: 'protected' });
};

export default { login, register, isLoggedIn };
