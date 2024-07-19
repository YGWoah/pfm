import prisma from '../../prisma/prisma';

const createArticle = async (
  title: string,
  content: string,
  categoryId: number,
  userId: number,
  image: string,
  published: boolean
) => {
  return prisma.article.create({
    data: {
      titre: title,
      contenu: content,
      Categorie: { connect: { id: categoryId } },
      User: { connect: { id: userId } },
      ...(image ? { image: image } : {}),
      ...(published ? { published: published } : {}),
    },
  });
};

const getArticles = (take: number, skip: number) => {
  return prisma.article.findMany({
    take: take ? take : undefined,
    skip: skip ? skip : undefined,
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
  });
};

const updateArticle = async (
  id: number,
  title: string,
  content: string,
  categoryId: number
) => {
  return prisma.article.update({
    where: {
      id: id,
    },
    data: {
      titre: title,
      contenu: content,
      Categorie: { connect: { id: categoryId } },
    },
  });
};

const deleteArticle = async (id: number) => {
  return prisma.article.delete({
    where: {
      id: id,
    },
  });
};

const getArticleById = async (id: number) => {
  return prisma.article.findUnique({
    where: {
      id: id,
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
  });
};

const getArticlesByUserId = (userId: number) => {
  return prisma.article.findMany({
    where: {
      userId: userId,
    },
    include: {
      Categorie: {
        select: {
          nom: true,
        },
      },
    },
  });
};

const deleteArticleByUserIdAndid = async (
  id: number,
  userId: number
) => {
  return prisma.article.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
};

export default {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  getArticleById,
  getArticlesByUserId,
  deleteArticleByUserIdAndid,
};
