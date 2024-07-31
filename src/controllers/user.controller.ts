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
  try {
    const { name } = req.body;
    const id = req.user?.id;

    if (!id || !name) {
      return res.status(400).json({ error: 'ID or name is missing' });
    }

    if (name.length < 2 || name.length > 50) {
      return res
        .status(400)
        .json({ error: 'Name must be between 2 and 50 characters' });
    }

    const user = await UserModel.updateUserName(parseInt(id), name);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Name updated',
      user: {
        id: user.id,
        name: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error updating user name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const id = req.user?.id;

    if (!id || !password) {
      return res
        .status(400)
        .json({ error: 'ID or password is missing' });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long',
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.updateUserPassword(
      parseInt(id),
      hashedPassword
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Password updated',
      user: {
        id: user.id,
        name: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error updating user password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const id = req.user?.id;

    if (!id || !email) {
      return res
        .status(400)
        .json({ error: 'ID or email is missing' });
    }

    if (email.length < 4 || email.length > 30) {
      return res
        .status(400)
        .json({ error: 'Email must be between 4 and 30 characters' });
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email is not valid' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await UserModel.updateUserEmail(parseInt(id), email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Email updated',
      user: {
        id: user.id,
        name: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error updating user email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserDescription = async (req: Request, res: Response) => {
  let { description } = req.body;
  let id = req.user?.id;

  if (!id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  UserModel.updateUserDescription(parseInt(id), description)
    .then((user: User | null) => {
      res.json(user);
    })
    .catch((error: any) => {
      res.json(error);
    });

  return null;
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
  updateUserDescription,
  deleteUser,
  getUserArticles,
};
