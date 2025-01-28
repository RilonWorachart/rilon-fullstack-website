import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import formRoutes from './routes/formRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); 


const app = express();
app.use(express.json());
app.use(cors());

// Define your routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', formRoutes);

const uploadsPath = path.join(__dirname, 'public', 'uploads');
app.use('/api/uploads', express.static(uploadsPath));

app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
