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

const createCategory = (name: string) => {
	return prisma.categorie.create({
		data: {
			nom: name,
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

export default {
	getCategoryById,
	getAllCategories,
	getCategoryByName,
	createCategory,
	updateCategoryName,
	deleteCategory,
};
