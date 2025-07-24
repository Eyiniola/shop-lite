
// tests/product.test.js
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Product from '../models/Product';
import User from '../models/User';

let token;

beforeAll(async () => {
  // Connect to test DB if needed
  await mongoose.connect(process.env.MONGO_URI);

  // Clear users and products
  await User.deleteMany();
  await Product.deleteMany();

  // Create and login user
  const newUser = await request(app).post('/auth/register').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });

  const loginRes = await request(app).post('/auth/login').send({
    email: 'test@example.com',
    password: 'password123',
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
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
