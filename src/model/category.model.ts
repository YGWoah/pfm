import prisma from '../../prisma/prisma';

const getCategoryById = (id: number) => {
  return prisma.categorie.findUnique({
    where: {
      id: id,
    },
  });
};

const getAllCategories = () => {
  return prisma.categorie.findMany();
};

const getCategoryByName = (name: string) => {
  return prisma.categorie.findUnique({
    where: {
      nom: name,
    },
  });
};

const createCategory = (
  name: string,
  color: string,
  userdId: number
) => {
  return prisma.categorie.create({
    data: {
      nom: name,
      color: color,
      userId: userdId,
    },
  });
};

const updateCategoryName = (id: number, name: string) => {
  return prisma.categorie.update({
    where: {
      id: id,
    },
    data: {
      nom: name,
    },
  });
};

const deleteCategory = (id: number) => {
  return prisma.categorie.delete({
    where: {
      id: id,
    },
  });
};

const getCategoriesByUserId = (userId: number) => {
  return prisma.categorie.findMany({
    where: {
      userId: userId,
    },
  });
};
export default {
  getCategoryById,
  getAllCategories,
  getCategoryByName,
  createCategory,
  updateCategoryName,
  deleteCategory,
  getCategoriesByUserId,
};
