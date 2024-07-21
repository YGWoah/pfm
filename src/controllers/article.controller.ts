import { Request, Response, NextFunction } from 'express';
import { Article } from '@prisma/client';
import ArticleModel from '../model/article.model';

const getArticles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { take, skip } = req.query;

  ArticleModel.getArticles(
    parseInt(take as string),
    parseInt(skip as string)
  ).then((article: Article[] | null) => {
    res.json(article);
  });
};

const getArticleById = (req: Request, res: Response) => {
  let { id } = req.params;

  ArticleModel.getArticleById(parseInt(id))
    .then((article: Article | null) => {
      res.json(article);
    })
    .catch((error) => {
      res.json(error);
    });
};

const createArticle = async (req: Request, res: Response) => {
  let {
    titre,
    contenu,
    categorie,
    image,
    published,
  }: {
    titre: string;
    contenu: string;
    categorie: number;
    image: string;
    published: boolean;
  } = req.body;

  let userId = req.user?.id as number;

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

  ArticleModel.createArticle(
    titre,
    contenu,
    categorie,
    userId,
    image,
    published
  )
    .then((article: Article) => {
      res.json(article);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
};

const updateArticle = (req: Request, res: Response) => {
  let { id } = req.params;
  let { titre, contenu, categorieId } = req.body;

  let existingArticle = ArticleModel.getArticleById(parseInt(id));

  if (!existingArticle) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  ArticleModel.updateArticle(
    parseInt(id),
    titre,
    contenu,
    categorieId
  )
    .then((article: Article) => {
      res.json(article);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
};

const deleteArticleByUserIdAndid = (req: Request, res: Response) => {
  let { id } = req.params;
  let userId = req.user?.id as number;
  let existingArticle = ArticleModel.getArticleById(parseInt(id));

  if (!existingArticle) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  ArticleModel.deleteArticleByUserIdAndid(parseInt(id), userId)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

export default {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticleByUserIdAndid,
};
