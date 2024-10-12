import { Link } from "react-router-dom";
import './footer.css'
function Footer() {
  return(
  <footer className="py-5" style={{fontFamily: 'Futura, sansSerif',marginLeft:'2rem'}}>
    <div className="row">
      <div className="col-2">
        <h5 style={{fontWeight:'bold'}}>TASHAN</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
          <li className="nav-item mb-2"><Link to="/men" className="nav-link p-0 text-muted">Men</Link></li>
          <li className="nav-item mb-2"><Link to="/women" className="nav-link p-0 text-muted">Women</Link></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>

      <div className="col-2">
        <h5 style={{fontWeight:'bold'}}>TASHAN</h5>
        <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
          <li className="nav-item mb-2"><Link to="/men" className="nav-link p-0 text-muted">Men</Link></li>
          <li className="nav-item mb-2"><Link to="/women" className="nav-link p-0 text-muted">Women</Link></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>

      <div className="col-2">
        <h5 style={{fontWeight:'bold'}}>TASHAN</h5>
        <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
          <li className="nav-item mb-2"><Link to="/men" className="nav-link p-0 text-muted">Men</Link></li>
          <li className="nav-item mb-2"><Link to="/women" className="nav-link p-0 text-muted">Women</Link></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>

      <div className="col-4 offset-1">
        <form>
          <h5 style={{fontWeight:'bold'}}>Subscribe to our newsletter</h5>
          <p>Monthly digest of whats new and exciting from us.</p>
          <div className="d-flex w-100 gap-2">
            <label for="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
            <button className="btn btn-primary" type="button" style={{backgroundColor:'black', border:'none'}}>Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div className="d-flex justify-content-between py-4 my-4 border-top">
      <p>© 2024 TASHAN, Inc. All rights reserved.</p>
      
    </div>
  </footer>

  )
}

export default Footer;