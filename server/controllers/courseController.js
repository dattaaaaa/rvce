import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('professor', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get courses for a specific student
// @route   GET /api/courses/my-courses
// @access  Private/Student
export const getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user._id }).populate({
            path: 'course',
            populate: {
                path: 'professor',
                select: 'name'
            }
        });
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Add these new functions to the existing file

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
    const { courseCode, courseName, branch, semester, year, credits } = req.body;

    try {
        const courseExists = await Course.findOne({ courseCode });
        if (courseExists) {
            return res.status(400).json({ message: 'Course with this code already exists' });
        }

        const course = new Course({
            courseCode, courseName, branch, semester, year, credits
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            await course.deleteOne();
            // Also remove any enrollments for this course
            await Enrollment.deleteMany({ course: req.params.id });
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};