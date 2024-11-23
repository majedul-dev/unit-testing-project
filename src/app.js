import express, { urlencoded } from 'express';
import cors from "cors"
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();

// Middleware
app.use(cors())
app.use(express.json({limit: "16kb"}));
app.use(urlencoded({extended: true, limit: "16kb"}))

// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.use(errorHandler)
export {app}