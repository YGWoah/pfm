import { Request, Response, NextFunction } from 'express';
import { Categorie } from '@prisma/client';

import CategoryModel from '../model/category.model';

const getAllCategories = (req: Request, res: Response, next: NextFunction) => {
	CategoryModel.getAllCategories().then((categorie: Categorie[] | null) => {
		res.json(categorie);
	});
};

const getCategoryById = (req: Request, res: Response) => {
	let { id } = req.params;
	CategoryModel.getCategoryById(parseInt(id))
		.then((category: Categorie | null) => {
			res.json(category);
		})
		.catch((error) => {
			res.json(error);
		});
};

const createCategory = async (req: Request, res: Response) => {
	let { name } = req.body;

	let existingCategory = await CategoryModel.getCategoryByName(name);

	if (existingCategory) {
		res.status(409).json({ error: 'Category already exists' });
		return;
	}

	CategoryModel.createCategory(name)
		.then((category: Categorie) => {
			res.json(category);
		})
		.catch((error) => {
			console.log(error);
			res.json({ error });
		});
};

const updateCategoryName = (req: Request, res: Response) => {
	let { name } = req.body;
	let { id } = req.params;

	let existingCategory = CategoryModel.getCategoryById(parseInt(id));

	if (!existingCategory) {
		res.status(404).json({ error: 'Category not found' });
		return;
	}

	CategoryModel.updateCategoryName(parseInt(id), name)
		.then((category: Categorie) => {
			res.json(category);
		})
		.catch((error) => {
			res.json(error);
		});
};

const deleteCategory = (req: Request, res: Response) => {
	let { id } = req.params;

	let existingCategory = CategoryModel.getCategoryById(parseInt(id));

	if (!existingCategory) {
		res.status(404).json({ error: 'Category not found' });
		return;
	}

	CategoryModel.deleteCategory(parseInt(id))
		.then((category: Categorie) => {
			res.json(category);
		})
		.catch((error) => {
			res.json(error);
		});
};

export default {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategoryName,
	deleteCategory,
};
