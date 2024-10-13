import React from 'react';
import { useSelector } from "react-redux";
import AddToBag from "../components/addtobag";

function Women() {
  const products = useSelector((store) => store.products);
  const ASSET_BASE_URL = process.env.NODE_ENV === 'production'
   ? 'https://tashan-backend.onrender.com'
   : 'http://localhost:2700';
  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  const womenProducts = products.filter((product) => product.category === "women");
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {womenProducts.map((product) => {
          const imageUrl = `${ASSET_BASE_URL}${product.image}`;
          return (
            <div key={product._id} className="card" style={{ width: "18rem", margin: "10px", border: 'none', position: 'relative' }}>
              <img src={imageUrl} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 style={{ fontFamily: 'Futura, sans-serif', marginTop: '1rem', fontWeight: 'lighter', fontSize: '1rem' }}>{product.name}</h5>
                <p style={{ fontFamily: 'Futura, sans-serif', marginTop: '-0.5rem', fontWeight: 'lighter', fontSize: '0.9rem' }}>INR {product.price}</p>
                <AddToBag product={product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Women;
