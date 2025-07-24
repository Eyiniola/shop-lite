// tests/product.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';


import app from '../server.js'; 

import Product from '../models/Product.js';
import User from '../models/User.js';

jest.setTimeout(30000); // 30s for CI / Atlas

let token;
let productId;

beforeAll(async () => {
  // Connect to your test DB (Atlas or local). If you use mongodb-memory-server, plug it here instead.
  await mongoose.connect(process.env.MONGO_URI);

  // Clean collections
  await User.deleteMany();
  await Product.deleteMany();

  // Register user
  await request(app)
    .post('/auth/register')
    .send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

  // Login to get token
  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123',
    });

  token = loginRes.body.token;
  if (!token) {
    throw new Error('Failed to obtain JWT token during test setup');
  }
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 1000,
        description: 'A product for testing',
        category: 'Test',
        inStock: true,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price).toBe(1000);

    productId = res.body._id;
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should update a product', async () => {
    expect(productId).toBeDefined();

    const res = await request(app)
      // If your route is PATCH, change to .patch
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 3500 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(3500);
  });

  it('should delete a product', async () => {
    expect(productId).toBeDefined();

    const res = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted');
  });
});
