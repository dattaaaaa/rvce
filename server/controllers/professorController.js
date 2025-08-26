import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

// @desc    Get courses taught by the logged-in professor
// @route   GET /api/professor/courses
// @access  Private/Professor
export const getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({ professor: req.user._id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get students enrolled in a specific course
// @route   GET /api/professor/courses/:courseId/students
// @access  Private/Professor
export const getEnrolledStudents = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ course: req.params.courseId })
            .populate('student', 'name usn email faceDescriptor');
        
        const students = enrollments.map(e => e.student);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Save face descriptor for a student
// @route   POST /api/professor/students/:studentId/face
// @access  Private/Professor
export const saveFaceDescriptor = async (req, res) => {
    try {
        const student = await User.findById(req.params.studentId);
        if (student) {
            student.faceDescriptor = req.body.descriptor;
            await student.save();
            res.json({ message: 'Face data saved successfully.' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};