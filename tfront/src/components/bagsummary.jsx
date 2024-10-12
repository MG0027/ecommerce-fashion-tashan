import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./bagsummary.css";
import { bagitemsActions } from "../store/bagitemsslice";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q8kC8FMYKdkHPprjphNFtZHkOIXixbs0cx39fX7nzFVLYAAI74sgaAjTjfSGHsq8yYB2NUaQUGwflvQr0yoEUAp00x8VAc4gS'); 

const BagSummary = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);
  const bagitems = useSelector((store) => store.bagitems);
  const stripe = useStripe();  
  const elements = useElements();
  console.log(bagitems);
 
  let totalMRP = 0;
  let Quantity = 0;
  bagitems.forEach((item) => {
    totalMRP += item.productPrice * item.quantity;
    Quantity += item.quantity;
  });
  
  const CONVENIENCE_FEES = 99;
  const finalPayment = totalMRP + CONVENIENCE_FEES;

  const handlePayment = async (event) => {
    event.preventDefault(); 

    const stripe = await stripePromise; 

    if (!stripe || !elements) {
      return; 
    }

    try {
      const response = await fetch('http://localhost:2700/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalPayment * 100, 
          currency: 'inr',
          
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
       
        alert(result.error.message);
      }

      
      dispatch(bagitemsActions.clearCart());
      
      await clearCartInBackend();
      
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  
  const clearCartInBackend = async () => {
    try {
      const response = await fetch('http://localhost:2700/api/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }), 
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart in backend');
      }

    } catch (error) {
      console.error('Error clearing cart in backend:', error);
    }
  };

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({Quantity} Item) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP </span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>

        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <CardElement />
        <button type="submit" disabled={!stripe} className="btn-place-order">PLACE ORDER</button>
      </form>
    </div>
  );
};

export default BagSummary;
