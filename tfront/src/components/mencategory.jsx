import React, { useState } from 'react';
import Sidebar from './sidebar';
import { useSelector } from 'react-redux';
import AddToBag from "../components/addtobag";
import styles from './mencategory.module.css'; // Importing CSS module

function Mencategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const products = useSelector((store) => store.products);
  const ASSET_BASE_URL = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:2700';
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category2 === selectedCategory && product.category === 'men')
    : products.filter(product => product.category === 'men');

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <Sidebar setSelectedCategory={setSelectedCategory} />

      {/* Product Cards */}
      <div className={styles['product-container']}>
        {filteredProducts.map((product) => {
          const imageUrl = `${ASSET_BASE_URL}${product.image}`;
          return (
            <div key={product._id} className={styles['product-card']}>
              <img src={imageUrl} className={styles['product-image']} alt={product.name} />
              <h5 className={styles['product-name']}>{product.name}</h5>
              <p className={styles['product-price']}>INR {product.price}</p>
              <AddToBag product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mencategory;
