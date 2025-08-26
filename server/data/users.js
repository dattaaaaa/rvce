import bcrypt from 'bcryptjs';

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('password123', salt);

const users = [
  // 1. Admin
  {
    name: 'College Admin',
    email: 'admin@rvce.edu.in',
    password: hashedPassword,
    role: 'admin',
  },
  // 2. Professors
  {
    name: 'Dr. S. K. Singh',
    email: 'sksingh@rvce.edu.in',
    password: hashedPassword,
    role: 'professor',
    employeeId: 'RVCE-PROF-001',
  },
  {
    name: 'Dr. Rashmi R',
    email: 'rashmi.r@rvce.edu.in',
    password: hashedPassword,
    role: 'professor',
    employeeId: 'RVCE-PROF-002',
  },
  // 3. Students (AIML)
  {
    name: 'Vishnu S',
    email: 'vishnu.ai22@rvce.edu.in',
    password: hashedPassword,
    role: 'student',
    usn: '1RV22AI024',
    branch: 'AIML',
    year: 3,
  },
  {
    name: 'Ananya Sharma',
    email: 'ananya.ai22@rvce.edu.in',
    password: hashedPassword,
    role: 'student',
    usn: '1RV22AI005',
    branch: 'AIML',
    year: 3,
  },
  {
    name: 'Rohan Gupta',
    email: 'rohan.ai22@rvce.edu.in',
    password: hashedPassword,
    role: 'student',
    usn: '1RV22AI045',
    branch: 'AIML',
    year: 3,
  },
  // 4. Recruiter
  {
    name: 'Priya HR',
    email: 'priya.hr.r@rvce.edu.in',
    password: hashedPassword,
    role: 'recruiter',
  },
];

export default users;