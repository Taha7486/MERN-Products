import express from 'express';
import authCon from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', authCon.registerUser);
router.post('/login', authCon.loginUser);

export default router;