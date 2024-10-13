import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useauth';
import API_BASE_URL from '../config';
function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(''); 
  const { fetchUserInfo } = useAuth();

  const handleLogin = async(e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
          
      const response = await fetch(`${API_BASE_URL}/user/login`, { 
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem('token', data.token);
        await fetchUserInfo();
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
       
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

   
  
  useEffect(() => {
   
    if (error) {
      alert(error);
    }
  }, [error]);
  return (
    <>
      <section className="vh-100" style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src="/images/Desktop-Fashion-HD-Wallpapers.jpg"
          alt="Login Background" 
          style={{
            width: '100%',
            height: '100vh',         
            objectFit: 'cover',      
            position: 'absolute',     
            top: 0,
            left: 0,
            zIndex: -1               
          }} 
        />
        <div className="container-fluid h-100 d-flex align-items-center justify-content-center ">
          <div className="row w-100">
            <div className="col-sm-6 text-white">
              <form style={{ width: "23rem", backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '2rem', borderRadius: '1.3rem' }} onSubmit={handleLogin}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "0px", fontFamily: 'Futura, sansSerif', color: 'whitesmoke' }}>LOGIN</h3>

                <div className="form-outline mb-4">
                  <input 
                    type="email" 
                    ref={emailRef} 
                    className="form-control form-control-lg" 
                    style={{ borderRadius: '0.6rem' }} 
                    required 
                  />
                  <label className="form-label" htmlFor="email" style={{ fontFamily: 'Futura, sansSerif', color: 'whitesmoke', opacity: '0.9' }}>EMAIL ADDRESS</label>
                </div>

                <div className="form-outline mb-4">
                  <input 
                    type="password" 
                    ref={passwordRef} 
                    className="form-control form-control-lg" 
                    style={{ borderRadius: '0.6rem' }} 
                    required 
                  />
                  <label className="form-label" htmlFor="password" style={{ fontFamily: 'Futura, sansSerif', color: 'whitesmoke', opacity: '0.9' }}>PASSWORD</label>
                </div>

                <div className="pt-1 mb-4">
                  <button type="submit" className="btn btn-light" style={{ borderRadius: '1.7rem', fontFamily: 'Futura, sansSerif' }}>LOGIN</button>
                </div>

                <p>Don't have an account? <Link to="/signup" className="link-info">SIGNUP</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
