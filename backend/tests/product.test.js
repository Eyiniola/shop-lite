// tests/product.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

jest.setTimeout(30000); // Increase timeout to 30 seconds

let token;

beforeAll(async () => {
  try {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear collections
    await User.deleteMany();
    await Product.deleteMany();

    // Create a test user
    await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    // Login test user to get token
    const loginRes = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    token = loginRes.body.token;
    if (!token) throw new Error('Failed to retrieve auth token');
  } catch (error) {
    console.error('Error in beforeAll:', error);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close(true);
  } catch (error) {
    console.error('Error closing DB:', error);
  }
});

describe('Product API', () => {
  let product;

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 1000,
        description: 'A product for testing',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price).toBe(1000);

    product = res.body; // Save for later tests
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .patch(`/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 3500 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(3500);
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted');
  });
});
