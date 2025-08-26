import express from 'express';
import { getMyCourses, getEnrolledStudents, saveFaceDescriptor } from '../controllers/professorController.js';
import { protect } from '../middleware/auth.js'; // Assuming you have a 'professor' role check middleware

const router = express.Router();

// You might want to add a 'professor' middleware to protect these routes
router.get('/courses', protect, getMyCourses);
router.get('/courses/:courseId/students', protect, getEnrolledStudents);
router.post('/students/:studentId/face', protect, saveFaceDescriptor);

export default router;