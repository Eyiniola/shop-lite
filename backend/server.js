import express from 'express';
import dotenv from 'dotenv';
//import mongoose from 'mongoose';  
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('ShopList Lite API is running');
});

// Connect to DB and start server only if not testing
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      console.log('MongoDB connected');
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });
}

export default app;
