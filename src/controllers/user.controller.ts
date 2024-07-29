import { Request, Response } from 'express';
import { User } from '@prisma/client';
import prisma from '../../prisma/prisma';
import { hashPassword } from '../utils/passwordUtils';

import UserModel from '../model/user.model';
import ArticleModel from '../model/article.model';

const getUserById = async (req: Request, res: Response) => {
  let id = req.user?.id;

  if (!id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  UserModel.getUserById(parseInt(id))
    .then((user: User | null) => {
      res.json(user);
    })
    .catch((error: any) => {
      res.json(error);
    });
};

const getUserArticles = (req: Request, res: Response) => {
  ArticleModel.getArticlesByUserId(req.user?.id)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(500).json('Error while fetching articles');
    });

  return null;
};

const createUser = async (req: Request, res: Response) => {
  let { name, email, password, description } = req.body;

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Email is not valid' });
    return;
  }
  if (password.length < 8) {
    res.json({ error: 'Password is too short' });
    return;
  }
  if (name.length < 4) {
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

const updateUserName = async (req: Request, res: Response) => {
  console.log(req.headers);
  let { name } = req.body;
  let id = req.user?.id;

  UserModel.updateUserName(parseInt(id), name)
    .then((user: User | null) => {
      if (!user) {
        res.status(404).json({ error: 'user not found' });
        return;
      }

      res.json({
        message: 'name updated',
        user: {
          id: user.id,
          name: user.nom,
          email: user.email,
        },
      });
    })
    .catch((error: any) => {
      res.json(error);
    });
};

const updateUserPassword = async (req: Request, res: Response) => {
  let { password } = req.body;
  let id = req.user?.id;

  let hashedPassword = await hashPassword(password);

  UserModel.updateUserPassword(parseInt(id), hashedPassword).then(
    (user: User | null) => {
      if (!user) {
        res.status(404).json({ error: 'user not found' });
        return;
      }

      res.json({
        message: 'password updated',
        user: {
          id: user.id,
          name: user.nom,
          email: user.email,
        },
      });
    }
  );
};

const updateUserMail = async (req: Request, res: Response) => {
  let { email } = req.body;
  let id = req.user?.id;

  if (!id || !email) {
    res.status(400).json({ error: 'id or email is missing' });
    return;
  }
  if (email.length < 4 || email.length > 30) {
    res.json({ error: 'email is too short or too long' });
    return;
  }

  let existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    res.json({ error: 'email already exists' });
    return;
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.json({ error: 'email is not valid' });
    return;
  }
  UserModel.updateUserEmail(parseInt(id), email)
    .then((user: User | null) => {
      if (!user) {
        res.status(404).json({ error: 'user not found' });
        return;
      }
      res.json({
        message: 'email updated',
        user: {
          id: user.id,
          name: user.nom,
          email: user.email,
        },
      });
    })
    .catch((error: any) => {
      res.json(error);
    });
};

const deleteUser = async (req: Request, res: Response) => {
  let { password } = req.body;
  let id = req.user?.id;

  let dbPassword = UserModel.getUserById(parseInt(id))
    .then((user) => {
      if (user) {
        return user.password;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  if (!dbPassword) {
    res.status(404).json({ error: 'user not found' });
    return;
  }

  if (dbPassword !== password) {
    res.status(401).json({ error: 'password is not correct' });
    return;
  }
  UserModel.deleteUser(parseInt(id))
    .then((user: User) => {
      res.json({
        message: 'user deleted',
        user: {
          id: user.id,
          name: user.nom,
          email: user.email,
        },
      });
    })
    .catch((error: any) => {
      res.json(error);
    });
};

export default {
  createUser,
  getUserById,
  updateUserName,
  updateUserPassword,
  updateUserMail,
  deleteUser,
  getUserArticles,
};
