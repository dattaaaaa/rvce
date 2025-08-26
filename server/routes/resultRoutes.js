import express from 'express';
import { getResults } from '../controllers/resultController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getResults);

export default router;