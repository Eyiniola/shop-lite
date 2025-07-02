import React from 'react';
import styles from './ProductForm.module.css';

export default function ProductForm({ form, onChange, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        className={styles.input}
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={onChange}
        required
        step="0.01"
        min="0"
      />
      <input
        className={styles.input}
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={onChange}
      />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="inStock"
          checked={form.inStock}
          onChange={onChange}
        />
        In Stock
      </label>
      <button className={styles.button} type="submit">Add Product</button>
    </form>
  );
}
