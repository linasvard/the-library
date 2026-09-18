import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // This makes the Express server accept requests from other domains
  credentials: true    // Allows cookies sent to this API
}));

app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
import authRouter from '../src/routes/auth'
import greetingRouter from '../src/routes/greetings'
app.use('/api/auth', authRouter)
app.use('/api/greetings', greetingRouter)

import userRouter from '../src/routes/users'
import bookRouter from '../src/routes/books'
import genreRouter from '../src/routes/genres'
import reviewRouter from '../src/routes/reviews'
app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)
app.use('/api/genres', genreRouter)
app.use('/api/reviews', reviewRouter)

// Connect To DB
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})