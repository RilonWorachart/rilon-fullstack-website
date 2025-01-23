import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';


var app = express();
app.use(express.json());
app.use(cors());


app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
