import { Request, Response, NextFunction } from 'express';
import { Commentaire } from '@prisma/client';
import UserModel from '../model/user.model';
import ArticleModel from '../model/article.model';
import CommentModel from '../model/comment.model';

const createComment = async (req: Request, res: Response) => {
	let { contenu, articleId } = req.body;
	let userId = req.user?.id;

	let existingArticle = await ArticleModel.getArticleById(parseInt(articleId));

	if (!existingArticle) {
		res.status(404).json({ error: 'Article not found' });
		return;
	}

	if (!userId) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	let existingUser = await UserModel.getUserById(userId);

	if (!existingUser) {
		res.status(404).json({ error: 'User not found' });
		return;
	}
	CommentModel.createComment(contenu, userId, parseInt(articleId))
		.then((commentaire: Commentaire) => {
			res.status(200).json(commentaire);
		})
		.catch((error) => {
			console.log(error);
			res.json({ error });
		});
};

const getCommentsByUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let userId = req.user?.id;
	let existingUser = await UserModel.getUserById(parseInt(userId));

	if (!existingUser) {
		res.status(404).json({ error: 'User not found' });
		return;
	}

	CommentModel.getCommentsByUser(parseInt(userId)).then(
		(comment: Commentaire[] | null) => {
			res.json(comment);
		}
	);
};

const getAllcommentsByArticle = async (req: Request, res: Response) => {
	try {
		let { articleID } = req.params;
		if (!articleID) {
			res.status(403).json({ error: 'insuffisent data' });
			return;
		}
		let existingArticle = await ArticleModel.getArticleById(parseInt(articleID));
		if (!existingArticle) {
			res.status(404).json({ error: 'Article not found' });
			return;
		}

		CommentModel.getCommentsByArticle(parseInt(articleID)).then(
			(commentaire: Commentaire[] | null) => {
				res.json(commentaire);
			}
		);
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: 'something went wrong' });
	}
};

const updateComment = async (req: Request, res: Response) => {
	let { commentID } = req.params;
	let { contenu } = req.body;

	let existingComment = await CommentModel.getCommentById(parseInt(commentID));

	if (!existingComment) {
		res.status(404).json({ error: 'Comment not found' });
		return;
	}

	CommentModel.updateComment(parseInt(commentID), contenu).then(
		(commentaire: Commentaire) => {
			res.json(commentaire);
		}
	);
};

const deleteComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { commentID } = req.params;

	let existingComment = await CommentModel.getCommentById(parseInt(commentID));

	if (!existingComment) {
		res.status(404).json({ error: 'Comment not found' });
		return;
	}

	CommentModel.deleteComment(parseInt(commentID)).then(
		(commentaire: Commentaire) => {
			res.json(commentaire);
		}
	);
};

export default {
	createComment,
	getCommentsByUser,
	getAllcommentsByArticle,
	updateComment,
	deleteComment,
};
