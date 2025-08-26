// Courses for AIML Branch
// Data from 1st to 3rd year is based on your input.
// 4th year courses are populated with relevant mock data.

const courses = [
  // Year 1, Sem 1 (Common)
  { courseCode: '22MA11', courseName: 'FUNDAMENTALS OF LINEAR ALGEBRA, CALCULUS AND STATISTICS', branch: 'AIML', semester: 1, year: 1, credits: 4 },
  { courseCode: '22CH12', courseName: 'CHEMISTRY OF SMART MATERIALS AND DEVICES', branch: 'AIML', semester: 1, year: 1, credits: 4 },
  { courseCode: '22ME13', courseName: 'COMPUTER AIDED ENGINEERING GRAPHICS', branch: 'AIML', semester: 1, year: 1, credits: 3 },
  { courseCode: '22CV14', courseName: 'ELEMENTS OF CIVIL ENGINEERING', branch: 'AIML', semester: 1, year: 1, credits: 3 },
  { courseCode: '22IS15', courseName: 'INTRODUCTION TO C++ PROGRAMMING', branch: 'AIML', semester: 1, year: 1, credits: 3 },
  // Year 1, Sem 2 (Common)
  { courseCode: '22MA21', courseName: 'NUMBER THEORY, VECTOR CALCULUS AND COMPUTATIONAL METHODS', branch: 'AIML', semester: 2, year: 1, credits: 4 },
  { courseCode: '22PY22', courseName: 'QUANTUM PHYSICS FOR ENGINEERS', branch: 'AIML', semester: 2, year: 1, credits: 4 },
  { courseCode: '22CS23', courseName: 'PRINCIPLES OF PROGRAMMING USING C', branch: 'AIML', semester: 2, year: 1, credits: 3 },
  { courseCode: '22CS24', courseName: 'INTRODUCTION TO CYBER SECURITY', branch: 'AIML', semester: 2, year: 1, credits: 3 },
  { courseCode: '22EE25', courseName: 'BASICS OF ELECTRICAL ENGINEERING', branch: 'AIML', semester: 2, year: 1, credits: 3 },
  // Year 2, Sem 3
  { courseCode: '21MA31', courseName: 'MATHEMATICS FOR ARTIFICIAL INTELLIGENCE & MACHINE LEARNING', branch: 'AIML', semester: 3, year: 2, credits: 4 },
  { courseCode: '21AI32', courseName: 'FUNDAMENTALS OF DATA STRUCTURES AND DATA ANALYSIS', branch: 'AIML', semester: 3, year: 2, credits: 4 },
  { courseCode: '21AI33', courseName: 'FOUNDATIONS OF CYBER PHYSICAL SYSTEMS', branch: 'AIML', semester: 3, year: 2, credits: 4 },
  { courseCode: '21AI34', courseName: 'STATISTICS FOR DATA SCIENCE', branch: 'AIML', semester: 3, year: 2, credits: 4 },
  { courseCode: '21BT35', courseName: 'BIO SAFETY STANDARDS AND ETHICS', branch: 'AIML', semester: 3, year: 2, credits: 3 },
  // Year 2, Sem 4
  { courseCode: '21CS41', courseName: 'DISCRETE MATHEMATICAL STRUCTURES AND COMBINATORICS', branch: 'AIML', semester: 4, year: 2, credits: 3 },
  { courseCode: '21AI42', courseName: 'DESIGN AND ANALYSIS OF ALGORITHMS', branch: 'AIML', semester: 4, year: 2, credits: 4 },
  { courseCode: '21AI43', courseName: 'ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING', branch: 'AIML', semester: 4, year: 2, credits: 4 },
  { courseCode: '21CY44', courseName: 'COMPUTER NETWORKS', branch: 'AIML', semester: 4, year: 2, credits: 3 },
  { courseCode: '21AI45', courseName: 'INTRODUCTION TO OPERATING SYSTEMS (MOOC)', branch: 'AIML', semester: 4, year: 2, credits: 2 },
  // Year 3, Sem 5
  { courseCode: '20HS51', courseName: 'PRINCIPLES OF MANAGEMENT AND ECONOMICS', branch: 'AIML', semester: 5, year: 3, credits: 3 },
  { courseCode: '20CD52', courseName: 'DATABASE MANAGEMENT SYSTEMS', branch: 'AIML', semester: 5, year: 3, credits: 4 },
  { courseCode: '20AI53', courseName: 'ARTIFICIAL NEURAL NETWORKS AND DEEP LEARNING', branch: 'AIML', semester: 5, year: 3, credits: 4 },
  { courseCode: '20AI54', courseName: 'MACHINE LEARNING OPERATIONS', branch: 'AIML', semester: 5, year: 3, credits: 4 },
  { courseCode: '20AI55', courseName: 'MATHEMATICAL ALGORITHMS FOR ARTIFICIAL INTELLIGENCE', branch: 'AIML', semester: 5, year: 3, credits: 3 },
  // Year 3, Sem 6
  { courseCode: '20HS61', courseName: 'ENTREPRENEURSHIP AND INTELLECTUAL PROPERTY RIGHTS', branch: 'AIML', semester: 6, year: 3, credits: 3 },
  { courseCode: '20AI62', courseName: 'BIG DATA TECHNOLOGIES', branch: 'AIML', semester: 6, year: 3, credits: 4 },
  { courseCode: '20AI63', courseName: 'NATURAL LANGUAGE PROCESSING AND TRANSFORMERS', branch: 'AIML', semester: 6, year: 3, credits: 4 },
  { courseCode: '20AI64', courseName: 'CLOUD COMPUTING TECHNOLOGY AND ARCHITECTURES', branch: 'AIML', semester: 6, year: 3, credits: 4 },
  { courseCode: '20AI65', courseName: 'GENERATIVE ARTIFICIAL INTELLIGENCE', branch: 'AIML', semester: 6, year: 3, credits: 3 },
  // Year 4, Sem 7 (Mock Data)
  { courseCode: '19AI71', courseName: 'REINFORCEMENT LEARNING', branch: 'AIML', semester: 7, year: 4, credits: 4 },
  { courseCode: '19AI72', courseName: 'COMPUTER VISION AND IMAGE PROCESSING', branch: 'AIML', semester: 7, year: 4, credits: 4 },
  { courseCode: '19AI73', courseName: 'AI ETHICS AND GOVERNANCE', branch: 'AIML', semester: 7, year: 4, credits: 3 },
  { courseCode: '19AIE74X', courseName: 'ELECTIVE I: ADVANCED NLP', branch: 'AIML', semester: 7, year: 4, credits: 3 },
  { courseCode: '19AIP75', courseName: 'PROJECT WORK - PHASE 1', branch: 'AIML', semester: 7, year: 4, credits: 2 },
  // Year 4, Sem 8 (Mock Data)
  { courseCode: '19AI81', courseName: 'LARGE SCALE MACHINE LEARNING', branch: 'AIML', semester: 8, year: 4, credits: 4 },
  { courseCode: '19AIE82X', courseName: 'ELECTIVE II: AI FOR ROBOTICS', branch: 'AIML', semester: 8, year: 4, credits: 3 },
  { courseCode: '19AIP83', courseName: 'PROJECT WORK - PHASE 2 & SEMINAR', branch: 'AIML', semester: 8, year: 4, credits: 10 },
  { courseCode: '19AII84', courseName: 'INTERNSHIP', branch: 'AIML', semester: 8, year: 4, credits: 5 },
];

export default courses;