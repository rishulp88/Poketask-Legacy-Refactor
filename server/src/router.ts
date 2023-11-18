import express, { Router } from "express";
import { logout, profile, getPoints, login, create } from './controllers/auth';
import authMiddleware from './middlewares/auth';
import { isChecked, check, remove, add } from './controllers/tasks';

const router: Router = express.Router();

router.post('/addTask', authMiddleware, add);
router.post('/remove', authMiddleware, remove);
router.post('/check', authMiddleware, check);
router.post('/isChecked', authMiddleware, isChecked);
router.post('/register', create);
router.post('/login', login);
router.get('/me', authMiddleware, profile);
router.post('/logout', authMiddleware, logout);
router.get('/points', authMiddleware, getPoints);

export { router };