import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import mongoose from 'mongoose';  
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', "https://shoplite-frontend.azurewebsites.net", "https://shoplite-frontend-staging.azurewebsites.net" ], // match your frontend origin
  credentials: true,
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('ShopList Lite API is running');
});

// Connect to DB and start server only if not testing
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      console.log('MongoDB connected');
      const PORT = process.env.PORT || process.env.WEBSITES_PORT || 3000;
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });
}

export default app;
