import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import formRoutes from './routes/formRoutes.js';
import recommendProductRoutes from './routes/recommendProductRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import searchwordRoutes from './routes/searchwordRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); 

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow all origins (for testing purposes, use specific origins for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));  // Apply the CORS middleware
// app.use(helmet());
app.use(express.json());


// Define your routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', formRoutes);
app.use('/api', recommendProductRoutes)
app.use('/api', brandRoutes)
app.use('/api', searchwordRoutes)
app.use('/api', videoRoutes)


// const uploadsPath = path.join(__dirname, 'public', 'uploads');
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
