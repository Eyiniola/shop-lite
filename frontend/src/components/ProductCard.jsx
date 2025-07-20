import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.category}>{product.category || 'Uncategorized'}</p>
      <p className={styles.description}>{product.description || 'No description'}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <p className={product.inStock ? styles.inStock : styles.outStock}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </p>
      <div className={styles.actions}>
        <button onClick={() => onEdit(product)} className={styles.edit}>Edit</button>
        <button onClick={() => onDelete(product._id)} className={styles.delete}>Delete</button>
      </div>
    </div>
  );
}
