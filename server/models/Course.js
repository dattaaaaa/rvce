import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  year: { type: Number, required: true },
  credits: { type: Number, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;