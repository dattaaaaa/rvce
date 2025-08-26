import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /@rvce\.edu\.in$/ },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'professor', 'recruiter'], required: true },
  usn: { type: String, unique: true, sparse: true }, // Sparse allows nulls to not be unique
  employeeId: { type: String, unique: true, sparse: true },
  branch: { type: String },
  year: { type: Number },
  faceDescriptor: { type: [Number] }, // Field to store face data
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;