import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  academicYear: { type: String, required: true },
  grade: { type: String },
}, { timestamps: true });

// Ensure a student can only enroll in a course once per academic year
enrollmentSchema.index({ student: 1, course: 1, academicYear: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;