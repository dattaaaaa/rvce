import mongoose from 'mongoose';
import users from './data/users.js';
import courses from './data/courses.js';
import resultsData from './data/results.js';
import enrollmentsData from './data/enrollments.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';
import Result from './models/Result.js';
import connectDB from './config/db.js';

await connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    console.log('Clearing old data...');
    await Result.deleteMany();
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log('Old data cleared.');

    // 2. Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} Users Imported!`);

    const professors = createdUsers.filter(u => u.role === 'professor');
    if (professors.length === 0) throw new Error('No professors found in users data.');

    // 3. Assign professors to courses and insert them
    const coursesWithProfessor = courses.map((course, index) => ({
        ...course,
        professor: professors[index % professors.length]._id // Cycle through professors for variety
    }));

    const createdCourses = await Course.insertMany(coursesWithProfessor);
    console.log(`${createdCourses.length} Courses Imported and Professors Assigned!`);
    
    // 4. Create maps for easy ID lookup
    const studentMap = createdUsers.filter(u => u.role === 'student').reduce((map, user) => {
        map[user.usn] = user._id;
        return map;
    }, {});

    const courseMap = createdCourses.reduce((map, course) => {
        map[course.courseCode] = course._id;
        return map;
    }, {});

    // 5. Create and insert enrollments
    const enrollments = enrollmentsData.map(e => {
        if (!studentMap[e.usn] || !courseMap[e.courseCode]) {
            console.warn(`Skipping enrollment for USN ${e.usn} - Course ${e.courseCode}: Not found.`);
            return null;
        }
        return {
            student: studentMap[e.usn],
            course: courseMap[e.courseCode],
            academicYear: '2023-24'
        };
    }).filter(Boolean); // Filter out any null entries

    if (enrollments.length > 0) {
        await Enrollment.insertMany(enrollments);
        console.log(`${enrollments.length} Enrollments Imported!`);
    } else {
        console.log('No valid enrollments to import.');
    }

    // 6. Create and insert results
    const results = resultsData.map(result => {
        if (!studentMap[result.usn] || !courseMap[result.courseCode]) {
            console.warn(`Skipping result for USN ${result.usn} - Course ${result.courseCode}: Not found.`);
            return null;
        }
        return {
            ...result,
            student: studentMap[result.usn],
            course: courseMap[result.courseCode]
        };
    }).filter(Boolean); // Filter out any null entries

    if (results.length > 0) {
        await Result.insertMany(results);
        console.log(`${results.length} Results Imported!`);
    } else {
        console.log('No valid results to import.');
    }

    console.log('\nData Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`\nError during data import: ${error.message}`);
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