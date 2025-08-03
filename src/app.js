import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import errorHandler from './middleware/errorHandler.js';
import searchRoute from './routes/search.route.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/search', searchRoute);

app.use(errorHandler);

export default app;
