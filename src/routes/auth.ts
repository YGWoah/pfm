import express from 'express';
import { authenticate } from '../middleware/authenticate';
const router = express.Router();

import AuthController from '../controllers/auth.controller';


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/isLoggedIn', authenticate, AuthController.isLoggedIn);
export default router;
