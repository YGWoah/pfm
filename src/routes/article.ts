import express, { Request, Response, NextFunction } from 'express';
import { Article } from '@prisma/client';
import { takeCoverage } from 'v8';

// const prisma = new PrismaClient();
import prisma from '../../prisma/prisma';
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  let { take, skip } = req.query;
  prisma.article
    .findMany({
      take: take ? parseInt(take as string) : undefined,
      skip: skip ? parseInt(skip as string) : undefined,
      orderBy: {
        createdAt: 'desc',
      },

      include: {
        Categorie: true,
        User: {
          select: {
            id: true,
            nom: true,
            email: true,
          },
        },
      },
    })
    .then((article: Article[] | null) => {
      res.json(article);
    });
});

//get a single article by id
router.get('/:id', (req: Request, res: Response) => {
  let { id } = req.params;
  prisma.article
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((article: Article | null) => {
      res.json(article);
    })
    .catch((error) => {
      res.json(error);
    });
});

//create a new article
router.post('/', async (req, res) => {
  let {
    titre,
    contenu,
    categorie,
    userId,
    image,
    published,
  }: {
    titre: string;
    contenu: string;
    categorie: number;
    userId: number;
    image: string;
    published: boolean;
  } = req.body; //userId is should be gotten from the token jwt
  if (!titre || !contenu || !categorie || !userId || !image)
    return res.status(400).json({
      succes: false,
      message: 'Data inusifisant',
    });

  //sould i check if the category exists?
  if (image.length > 249 || contenu.length > 1199) {
    return res.status(413).json({
      succes: false,
      message: 'Content Too Large',
    });
  }

  prisma.article
    .create({
      data: {
        titre: titre,
        contenu: contenu,
        Categorie: { connect: { id: categorie } },
        User: { connect: { id: userId } },
        ...(image ? { image: image } : {}),
        ...(published ? { published: published } : {}),
      },
    })
    .then((article: Article) => {
      res.json(article);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update an article
router.patch('/:id', (req: Request, res: Response) => {
  let { id } = req.params;
  let { titre, contenu, categorieId } = req.body;
  let existingArticle = prisma.article.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!existingArticle) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  prisma.article

    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        titre: titre,
        contenu: contenu,
        Categorie: { connect: { id: categorieId } },
      },
    })
    .then((article: Article) => {
      res.json(article);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//delete an article
router.delete('/:id', (req: Request, res: Response) => {
  let { id } = req.params;
  let existingArticle = prisma.article.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!existingArticle) {
    res.status(404).json({ error: 'Article not found' }); // i should check also if the user is the owner of the article
    return;
  }
  prisma.article
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then((article: Article) => {
      res.json(article);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

export default router;
