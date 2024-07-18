import prisma from '../../prisma/prisma';

const getCommentById = (id: number) => {
	return prisma.commentaire.findUnique({
		where: {
			id: id,
		},
	});
};

const getAllComments = () => {
	return prisma.commentaire.findMany();
};

const getCommentsByUser = (userID: number) => {
	return prisma.commentaire.findMany({
		where: {
			User: {
				id: userID,
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
	});
};

const getCommentsByArticle = (articleID: number) => {
	return prisma.commentaire.findMany({
		where: {
			Article: {
				id: articleID,
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
	});
};

const createComment = (content: string, userID: number, articleID: number) => {
	return prisma.commentaire.create({
		data: {
			contenu: content,
			User: {
				connect: {
					id: userID,
				},
			},
			Article: {
				connect: {
					id: articleID,
				},
			},
		},
	});
};

const updateComment = (id: number, content: string) => {
	return prisma.commentaire.update({
		where: {
			id: id,
		},
		data: {
			contenu: content,
		},
	});
};

const deleteComment = (id: number) => {
	return prisma.commentaire.delete({
		where: {
			id: id,
		},
	});
};

export default {
	getCommentById,
	getAllComments,
	getCommentsByUser,
	getCommentsByArticle,
	createComment,
	updateComment,
	deleteComment,
};
