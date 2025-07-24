import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductForm.module.css';
import instance from '../axios'; // make sure this is correctly imported

const ProductForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const existingProduct = location.state?.product;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: false
  });

  useEffect(() => {
    if (id && existingProduct) {
      setFormData(existingProduct);
    } else if (id) {
      (async () => {
        try {
          const res = await instance.get(`/products/${id}`);
          setFormData(res.data);
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      })();
    }
  }, [id, existingProduct]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await instance.put(`/products/${id}`, formData);
      } else {
        await instance.post('/products', formData);
      }
      navigate('/');
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"

        value={formData.name}
        onChange={handleChange}

        required
      />
      <input
        className={styles.input}
        type="text"
        name="description"
        placeholder="Description"

        value={formData.description}
        onChange={handleChange}

      />
      <input
        className={styles.input}
        type="number"
        name="price"
        placeholder="Price"

        value={formData.price}
        onChange={handleChange}

        required
        step="0.01"
        min="0"
      />
      <input
        className={styles.input}
        type="text"
        name="category"
        placeholder="Category"

        value={formData.category}
        onChange={handleChange}

      />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="inStock"

          checked={formData.inStock}
          onChange={handleChange}
        />
        In Stock
      </label>
      <button type="submit" className={styles.button}>
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ProductForm;

