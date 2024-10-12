import { Link } from 'react-router-dom';
import './trending.css'; 

function Trending() {
  return (
    <>
      <h2
        style={{
          fontFamily: 'Futura, sansSerif',
          color: 'black',
          textAlign: 'center',
          marginTop: '3rem',
          fontWeight: '400',
          fontSize: '30.6px',
          lineHeight: '30.6px',
          textRendering: 'optimizeSpeed',
        }}
      >
        TRENDING
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
       
        <div className="card">
        <Link to="/men" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-inner">
            <img
              src='/images/81eELgJgXnL._AC_UY1100_.jpg'
              className="card-img-top"
            />
            <div className="card-text">TEXTURED SHIRTS</div>
          </div>
          </Link>
        </div>

     
        <div className="card">
        <Link to="/women" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-inner">
            <img
              src='/images/08500331490-a1.jpg'
              className="card-img-top"
            />
            <div className="card-text"> SATIN DRESS</div>
          </div>
          </Link>
        </div>

      
        <div className="card">
  <Link to="/men" style={{ textDecoration: 'none', color: 'inherit' }}>  
    <div className="card-inner">
      <img
        src='/images/nine-slant-flap-pocket-cargo-pants-nines-closet-4_1080x.webp'
        className="card-img-top"
      />
      <div className="card-text">
        CARGO PANTS 
      </div>
    </div>
  </Link>
</div>


        <div className="card">
        <Link to="/women" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-inner">
            <img
              src='/images/01014803800-p.jpg'
              className="card-img-top"
            />
            <div className="card-text">RHINESTONES DRESS</div>
          </div>
          </Link>
        </div>
        
      </div>
    </>
  );
}

export default Trending;
