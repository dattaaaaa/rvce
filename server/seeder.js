import mongoose from 'mongoose';
import users from './data/users.js';
import courses from './data/courses.js';
import results from './data/results.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';
import Result from './models/Result.js';
import connectDB from './config/db.js';

await connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Result.deleteMany();
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    // Insert new data
    const createdUsers = await User.insertMany(users);
    console.log('Users Imported!');

    const professorUser = createdUsers.find(user => user.role === 'professor');
    const studentUser = createdUsers.find(user => user.role === 'student');

    // Assign the professor to the AIML courses before inserting them
    const coursesWithProfessor = courses.map(course => {
        if (course.branch === 'AIML') {
            return { ...course, professor: professorUser._id };
        }
        return course;
    });

    const createdCourses = await Course.insertMany(coursesWithProfessor);
    console.log('Courses Imported and Professor Assigned!');

    const studentCourses = createdCourses.filter(course => course.branch === 'AIML');

    const enrollments = studentCourses.map(course => ({
      student: studentUser._id,
      course: course._id,
      academicYear: '2023-24'
    }));
    await Enrollment.insertMany(enrollments);
    console.log('Enrollments Imported!');

    const studentResults = results.map(result => ({
        ...result,
        student: createdUsers.find(u => u.usn === result.usn)._id,
        course: createdCourses.find(c => c.courseCode === result.courseCode)._id
    }));

    await Result.insertMany(studentResults);
    console.log('Results Imported!');


    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Result.deleteMany();
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}