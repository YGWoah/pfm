import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  prisma.user.findFirst().then((user: User | null) => {
    res.json(user);
  });
});

router.get('/:id', (req: Request, res: Response) => {
  let { id } = req.params;
  prisma.user
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((user: User | null) => {
      res.json(user);
    })
    .catch((error: any) => {
      res.json(error);
    });
});

router.post('/', (req: Request, res: Response) => {
  let { name, email, password } = req.body;

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
  prisma.user
    .create({
      data: {
        nom: name, // i need to check if the name is unique
        email: email, // i need to check if the email is unique
        password: password, //i need to hash the password
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

// instead of using the id in the url we can use jwt token
router.patch('/:id/email', async (req: Request, res: Response) => {
  let { email } = req.body;
  let { id } = req.params;

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
  prisma.user
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: email,
      },
    })
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
});

//instead of using the id in the url we can use jwt token
router.patch('/:id/password', (req: Request, res: Response) => {
  let { password } = req.body;
  let { id } = req.params;
  prisma.user
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: password, //i need to hash the password
      },
    })
    .then((user: User | null) => {
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
    });
});

//instead of using the id in the url we can use jwt token to also check if the user is the owner of the account
router.patch('/:id/name', (req: Request, res: Response) => {
  let { name } = req.body;
  let { id } = req.params;
  prisma.user
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom: name,
      },
    })
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
});

//i need add another middleware that cahcks if the user is the owner of the account
router.delete('/:id', async (req: Request, res: Response) => {
  let { password } = req.body;
  let { id } = req.params;
  let dbPassword = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      password: true,
    },
  });
  console.log(dbPassword !== password);

  if (!dbPassword) {
    res.status(404).json({ error: 'user not found' });
    return;
  }

  if (dbPassword.password !== password) {
    res.status(401).json({ error: 'password is not correct' });
    return;
  }
  prisma.user
    .delete({
      where: {
        id: parseInt(id),
      },
    })
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
});

export default router;
