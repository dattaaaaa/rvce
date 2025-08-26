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

    const createdCourses = await Course.insertMany(courses);
    console.log('Courses Imported!');

    const studentUser = createdUsers.find(user => user.role === 'student');
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