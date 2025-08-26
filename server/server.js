import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import professorRoutes from './routes/professorRoutes.js'; // Import professor routes

// Connect to database (this will also load env variables)
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase body limit for face descriptors
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/professor', professorRoutes); // Add professor routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));