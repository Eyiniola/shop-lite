import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';
import Product from '../models/Product.js';
import User from '../models/User.js'; // Assuming this exists

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create test user and generate JWT
  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword123' // Should be hashed if required by your schema
  });

  token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret', // Use same secret as your app
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany();
  await User.deleteMany();
});

describe('Product API (Authenticated)', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 1000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price).toBe(1000);
  });

  it('should fetch all products', async () => {
    await Product.create({ name: 'Rice', price: 5000 });

    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Rice');
  });

  it('should update a product', async () => {
    const product = await Product.create({ name: 'Beans', price: 3000 });

    const res = await request(app)
      .put(`/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 3500 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(3500);
  });

  it('should delete a product', async () => {
    const product = await Product.create({ name: 'Yam', price: 4000 });

    const res = await request(app)
      .delete(`/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted');
  });
});
