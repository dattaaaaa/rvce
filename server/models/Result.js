import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  grade: { type: String, required: true },
  gradePoints: { type: Number, required: true },
  academicYear: { type: String, required: true, default: '2023-24' },
}, { timestamps: true });

resultSchema.index({ student: 1, course: 1 }, { unique: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;