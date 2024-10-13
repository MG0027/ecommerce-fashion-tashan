import { useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddToBag from "./addtobag";


const Newdrops = () => {
  const products = useSelector((store) => store.products);

  if (!products || products.length === 0) {
    return <p>Loading products...</p>; 
  }
  const latestProducts = products.slice(-4); 
 
  return (
    <div>
      <h2 style={{ fontFamily: 'Futura, sansSerif', color: 'black', textAlign: 'center', marginTop: '5.5rem', fontWeight: '400', fontSize: '30.6px', lineHeight: '30.6px', textRendering: 'optimizeSpeed' }}>
        NEW DROPS
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {latestProducts.map((product) => (
          <div key={product._id} className="card" style={{ width: "18rem", margin: "10px",border:'none',position: 'relative' }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            
          
            
              <h5 style={{fontFamily:'Futura, sansSerif',marginTop:'1rem', fontWeight:'lighter'}}>{product.name}</h5>
              <p style={{fontFamily:'Futura, sansSerif',marginTop:'-0.5rem', fontWeight:'lighter'}} >INR {product.price}</p>
          
             <AddToBag product={product}></AddToBag>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newdrops;
