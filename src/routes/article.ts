import express from 'express';

const router = express.Router();

import ArticleController from '../controllers/article.controller';
import { authenticate } from '../middleware/authenticate';

router.get('/', ArticleController.getArticles);

router.get('/:id', ArticleController.getArticleById);

router.post('/', ArticleController.createArticle);

router.patch('/:id', ArticleController.updateArticle);

router.delete('/:id', ArticleController.deleteArticleByUserIdAndid);

export default router;
