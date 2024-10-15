import './index.css';
import Header from '../components/header'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import FetchProducts from '../components/fetchproducts';

import { Outlet } from "react-router-dom";
import { useAuth } from '../useauth';
import Fetchbag from '../components/fetchbag';
import Footer from '../components/footer';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q8kC8FMYKdkHPprjphNFtZHkOIXixbs0cx39fX7nzFVLYAAI74sgaAjTjfSGHsq8yYB2NUaQUGwflvQr0yoEUAp00x8VAc4gS');
function App() {
  
  useAuth();

  return (
    <>
    <Header></Header>
    <FetchProducts></FetchProducts>
    
   
     <Elements stripe={stripePromise}>
     <Outlet /> 
 </Elements>
 <Fetchbag></Fetchbag>
    <Footer></Footer>
     
    
     
    </>
  )
}

export default App
