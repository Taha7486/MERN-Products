import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './Routes/authRoutes.js';
import productRoutes from './Routes/productsRoutes.js';
import cors from 'cors';

const Port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.listen(Port, () => {
    connectDB();
    console.log(`🚀 Server running on http://localhost:${Port}`);
  });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
