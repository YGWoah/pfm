import { Request, Response, NextFunction } from 'express';
import { Categorie } from '@prisma/client';

import CategoryModel from '../model/category.model';

let getUserId = (req: Request) => {
  let userdId = req.user?.id;
  if (userdId === undefined) {
    throw new Error('Unauthorized');
  }
  return userdId;
};

const getAllCategories = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userdId = getUserId(req);
  CategoryModel.getCategoriesByUserId(userdId)
    .then((categories: Categorie[]) => {
      res.json(categories);
    })
    .catch((error) => {
      res.json(error);
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
  let { name, color } = req.body;

  let existingCategory = await CategoryModel.getCategoryByName(name);

  if (existingCategory) {
    res.status(409).json({ error: 'Category already exists' });
    return;
  }

  let userdId = req.user?.id;
  if (userdId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  CategoryModel.createCategory(name, color, userdId)
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
const getCategoriesByUserId = (
  userId: number
): Promise<Categorie[]> => {
  return CategoryModel.getCategoriesByUserId(userId);
};
export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryName,
  deleteCategory,
};
