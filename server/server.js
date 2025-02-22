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
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); 

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://www.rilonthailand.com',  // Frontend domain allowed to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions));  // Apply the CORS middleware
app.use(helmet());
app.use(express.json());


// Define your routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', formRoutes);
app.use('/api', recommendProductRoutes)
app.use('/api', brandRoutes)
app.use('/api', searchwordRoutes)

const uploadsPath = path.join(__dirname, 'public', 'uploads');
app.use('/api/uploads', express.static(uploadsPath));

app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
