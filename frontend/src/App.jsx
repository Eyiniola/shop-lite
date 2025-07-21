import React, { useEffect, useState } from 'react';
import instance from './axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProducts();
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await instance.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>ShopList Lite Products</h1>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {loading && <p>Loading products...</p>}
              {error && <p className="error">{error}</p>}
              <ProductList products={products} />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default App;
