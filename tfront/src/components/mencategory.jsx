import React, { useState } from 'react';
import Sidebar from './sidebar';
import { useSelector } from 'react-redux';
import AddToBag from "../components/addtobag";
import styles from './mencategory.module.css'; // Importing CSS module

function Mencategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const products = useSelector((store) => store.products);

  

  if (!products || products.length === 0) {
    return (<LoadingSpinner></LoadingSpinner>);
              
  }

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
          
          return (
            <div key={product._id} className={styles['product-card']}>
              <img src={product.image} className={styles['product-image']} alt={product.name} />
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
