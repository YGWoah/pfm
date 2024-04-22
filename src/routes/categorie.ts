import express from 'express';

const router = express.Router();

import CategoryController from '../controllers/category.controller';

router.get('/', CategoryController.getAllCategories);

router.get('/:id', CategoryController.getCategoryById);

router.post('/', CategoryController.createCategory);

router.patch('/:id', CategoryController.updateCategoryName);

router.delete('/:id', CategoryController.deleteCategory);

export default router;
