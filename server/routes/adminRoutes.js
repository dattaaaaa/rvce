import express from 'express';
import { registerUser } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';
const router = express.Router();

// All routes in this file are protected and require admin access
router.route('/register').post(protect, admin, registerUser);

export default router;