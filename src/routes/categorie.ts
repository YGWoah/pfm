import express, { Request, Response, NextFunction } from 'express';
import { Categorie } from '@prisma/client';

import prisma from '../../prisma/prisma';
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  prisma.categorie
    .findMany()
    .then((categorie: Categorie[] | null) => {
      res.status(200).json(categorie);
    });
});

router.get('/:id', (req: Request, res: Response) => {
  let { id } = req.params;
  prisma.categorie

    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((category: Categorie | null) => {
      res.json(category);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/', async (req, res) => {
  let { name } = req.body;

  let existingCategory = await prisma.categorie.findUnique({
    where: {
      nom: name,
    },
  });
  if (existingCategory) {
    res.status(409).json({ error: 'Category already exists' });
    return;
  }

  prisma.categorie
    .create({
      data: {
        nom: name,
      },
    })
    .then((category: Categorie) => {
      res.json(category);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.patch('/:id', (req, res) => {
  let { name } = req.body;
  let { id } = req.params;
  prisma.categorie

    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom: name,
      },
    })
    .then((category: Categorie) => {
      res.json(category);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  let { id } = req.params;
  console.log(id);
  console.log(req.params);

  prisma.categorie

    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then((category: Categorie) => {
      res.json(category);
    })
    .catch((error) => {
      res.json(error);
    });
});

export default router;
