import express from 'express';
import { getCourses, getMyCourses, createCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public/student routes
router.route('/my-courses').get(protect, getMyCourses);

// Admin and general routes
router.route('/')
    .get(protect, getCourses)
    .post(protect, admin, createCourse);

router.route('/:id')
    .delete(protect, admin, deleteCourse);

export default router;