import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/products', form);
      setProducts((prev) => [...prev, response.data]);
      setForm({ name: '', description: '', price: '', category: '', inStock: true });
    } catch (err) {
      setError('Failed to create product');
    }
  };

  return (
    <div className="container">
      <h1>ShopList Lite Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <ProductList products={products} />
      <h2>Add a new product</h2>
      <ProductForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
