import express from 'express';

import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/', UserController.getUserById);

router.get('/articles', UserController.getUserArticles);

router.post('/', UserController.createUser);

router.patch('/email', UserController.updateUserMail);

router.patch('/password', UserController.updateUserPassword);

router.patch('/name', UserController.updateUserName);

router.patch('/description', UserController.updateUserDescription);

router.delete('/', UserController.deleteUser);

export default router;
