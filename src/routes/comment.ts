import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Commentaire } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// create a comment
router.post('/', async (req, res) => {
  let { contenu, articleId } = req.body;
  let userId = req.user?.id;
  let existingArticle = await prisma.article.findUnique({
    where: {
      id: parseInt(articleId),
    },
  });
  console.log(req.user);

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!existingArticle) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  let existingUser = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });
  if (!existingUser) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  prisma.commentaire

    .create({
      data: {
        contenu: contenu,
        Article: { connect: { id: articleId } },
        User: { connect: { email: existingUser.email } },
      },
    })
    .then((commentaire: Commentaire) => {
      res.json(commentaire);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// get all comments of a user
router.get(
  '/user/:userID',
  async (req: Request, res: Response, next: NextFunction) => {
    let { userID } = req.params;
    let existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userID),
      },
    });
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    prisma.commentaire
      .findMany({
        where: {
          User: {
            id: parseInt(userID),
          },
        },
      })
      .then((commentaire: Commentaire[] | null) => {
        res.json(commentaire);
      });
  }
);

// get all comments of an article
router.get(
  '/article/:articleID',
  async (req: Request, res: Response, next: NextFunction) => {
    let { articleID } = req.params;
    let existingArticle = await prisma.article.findUnique({
      where: {
        id: parseInt(articleID),
      },
    });
    if (!existingArticle) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    prisma.commentaire
      .findMany({
        where: {
          Article: {
            id: parseInt(articleID),
          },
        },
        include: {
          User: {
            select: {
              id: true,
              role: true,
              nom: true,
            },
          },
        },
      })
      .then((commentaire: Commentaire[] | null) => {
        res.json(commentaire);
      });
  }
);

// update a comment
router.put(
  '/:commentID',
  async (req: Request, res: Response, next: NextFunction) => {
    let { commentID } = req.params;
    let { contenu } = req.body;
    let existingComment = await prisma.commentaire.findUnique({
      where: {
        id: parseInt(commentID),
      },
    });
    if (!existingComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    prisma.commentaire
      .update({
        where: {
          id: parseInt(commentID),
        },
        data: {
          contenu: contenu,
        },
      })
      .then((commentaire: Commentaire) => {
        res.json(commentaire);
      });
  }
);

// delete a comment
router.delete(
  '/:commentID',
  async (req: Request, res: Response, next: NextFunction) => {
    let { commentID } = req.params;
    let existingComment = await prisma.commentaire.findUnique({
      where: {
        id: parseInt(commentID),
      },
    });
    if (!existingComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    prisma.commentaire
      .delete({
        where: {
          id: parseInt(commentID),
        },
      })
      .then((commentaire: Commentaire) => {
        res.json(commentaire);
      });
  }
);

export default router;
