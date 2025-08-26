import User from '../models/User.js';

// Utility to determine role from email
const getRoleFromEmail = (email) => {
    if (email === 'admin@rvce.edu.in') return 'admin';
    if (email.endsWith('.r@rvce.edu.in')) return 'recruiter';
    const studentRegex = /^[a-zA-Z]+\.[a-zA-Z]{2}\d{2}@rvce\.edu\.in$/;
    if (studentRegex.test(email)) return 'student';
    return 'professor';
};


// @desc    Register a new user
// @route   POST /api/admin/register
// @access  Private/Admin
export const registerUser = async (req, res) => {
  const { name, email, password, usn, employeeId, branch, year } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const role = getRoleFromEmail(email);

    const user = await User.create({
      name,
      email,
      password,
      role,
      usn: role === 'student' ? usn : undefined,
      employeeId: role === 'professor' ? employeeId : undefined,
      branch: role === 'student' ? branch : undefined,
      year: role === 'student' ? year : undefined,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};