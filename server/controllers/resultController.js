import Result from '../models/Result.js';

// @desc    Get results for a logged in student
// @route   GET /api/results
// @access  Private
export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id }).populate('course');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};