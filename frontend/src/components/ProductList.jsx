import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import styles from './ProductList.module.css';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts(); // Refresh list
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleFormSubmit = async (data) => {
    if (editingProduct) {
      await axios.put(`http://localhost:5000/products/${editingProduct._id}`, data);
      setEditingProduct(null);
    } else {
      await axios.post('http://localhost:5000/products', data);
    }
    fetchProducts();
  };

  return (
    <div className={styles.list}>
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <ProductForm
        key={editingProduct ? editingProduct._id : 'new'}
        initialData={editingProduct}
        onSubmit={handleFormSubmit}
      />
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </div>
  );
}

export default Home;
