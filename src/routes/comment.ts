import express from 'express';

const router = express.Router();

import CommentController from '../controllers/comment.controller';

router.post('/', CommentController.createComment);

router.get('/user/:userID', CommentController.getCommentsByUser);

router.get('/article/:articleID', CommentController.getAllcommentsByArticle);

router.put('/:commentID', CommentController.updateComment);

router.delete('/:commentID', CommentController.deleteComment);

export default router;
