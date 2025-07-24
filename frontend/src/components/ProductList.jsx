import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await instance.get('https://shoplite-backend.azurewebsites.net/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await instance.delete(`https://shoplite-backend.azurewebsites.net/products/${id}`);
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <h2>All Products</h2>
        {isLoggedIn && (
        <button onClick={() => navigate('/create')} className={styles.button}>
          Create Product
        </button>
      )}
      </div>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={() => handleDelete(product._id)}
          onEdit={() => handleEdit(product._id)}
        />
      ))}
    </div>
  );
};

export default ProductList;

