import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/notes', noteRoutes);

const start = async () => {
  await connectDB();
  app.listen(3001, () => console.log('Note service running on :3001'));
};
start();