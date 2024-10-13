import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagitemsActions } from '../store/bagitemsslice';
import API_BASE_URL from '../config';
const Success = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false); 
  const {  userId } = useSelector(state => state.user);


  useEffect(() => {
    dispatch(bagitemsActions.clearCart());
  }, [dispatch]);

 
  const clearCartInBackend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bag/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }), 
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart in backend');
      }

      console.log('Cart cleared in backend');
    } catch (error) {
      console.error('Error clearing cart in backend:', error);
    }
  };


  const handleReturnToHome = async () => {
    await clearCartInBackend();  
    window.location.href = '/';  
  };

 
  const containerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    textAlign: 'center',
    maxWidth: '400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '10px',
    fontFamily: 'Futura, sansSerif',
  };

  const paragraphStyle = {
    color: '#666',
    marginBottom: '20px',
    fontFamily: 'Futura, sansSerif',
  };

  const buttonStyle = {
    backgroundColor: isHovered ? 'grey' : '#228B22', // Change color on hover
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Payment Successful!</h1>
      <p style={paragraphStyle}>Thank you for your purchase. Your order is being processed.</p>
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}  
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleReturnToHome} 
      >
        Return to Home
      </button>
    </div>
  );
};

export default Success;
