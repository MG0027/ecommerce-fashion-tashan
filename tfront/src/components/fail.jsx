import React from 'react';

const Cancel = () => {
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
    fontFamily:'Futura, sansSerif'
};

const paragraphStyle = {
    color: '#666',
    marginBottom: '20px',
     fontFamily:'Futura, sansSerif'
};

const buttonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s',
 
};

const buttonHoverStyle = {
    backgroundColor: 'grey',
};

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Payment Canceled</h1>
            <p style={paragraphStyle}>Your payment has been canceled. Please try again.</p>
            <a
                href="/"
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
                Return to Home
            </a>
        </div>
    );
};

export default Cancel;
