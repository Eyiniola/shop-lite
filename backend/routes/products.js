import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

// @desc    Create new product
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  try {
    const product = new Product({ name, description, price, category, inStock });
    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Update product
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.inStock = inStock ?? product.inStock;

      const updated = await product.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid ID or update error' });
  }
});

// @desc    Delete product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid ID or delete error' });
  }
});

export default router;
