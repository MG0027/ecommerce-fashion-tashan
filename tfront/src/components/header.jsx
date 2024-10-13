import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import styles from './header.module.css';
import { Link, useNavigate } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import {  PiBagLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/userslice';
import { bagitemsActions } from '../store/bagitemsslice';
import API_BASE_URL from '../config';


const Header = () => {
  const bagitems = useSelector((store) => store.bagitems);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.user); 
  const navigate = useNavigate(); 

 
  const handleMouseDown = (e) => {
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '';
    e.target.style.color = '';
  };

  const handleLogout = async () => {
    try {
   
      const response = await axios.post(`${API_BASE_URL}/user/logout`, {}, { withCredentials: true });
  
      if (response.status === 200) {
       
        dispatch(clearUser());
        dispatch(bagitemsActions.clearCart());
        
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error("Logout failed, response status:", response.status);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className={`${styles['header-container']} d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start`}>
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
              <h2 className={styles['header-logo']}>TASHAN</h2>
            </Link>
          </a>

          <ul className={`${styles['nav-links']} nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0`}>
            <li><Link to="/men" className="nav-link px-2 link-body-emphasis">MEN</Link></li>
            <li><Link to="/women" className="nav-link px-2 link-body-emphasis">WOMEN</Link></li>
          </ul>

          <a href="#" className="nav-link px-2 link-body-emphasis">
            <IoIosHeartEmpty style={{ fontSize: '1.7rem', marginRight: '-0.3rem' }} />
          </a>

          <Link to="/bag" className="nav-link px-2 link-body-emphasis">
            <PiBagLight style={{ fontSize: '2rem', marginRight: '0rem', marginTop: '0.1rem' }} />
          </Link>

          <div className="dropdown text-end">
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <CiUser style={{ fontSize: '1.7rem' }} />
            </a>
            <ul className="dropdown-menu text-small">
              {isLoggedIn ? (
                <li><Link className="dropdown-item" to="/" style={{ fontFamily: 'Futura, sansSerif' }} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onClick={handleLogout}>SIGN OUT</Link></li>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/login" style={{ fontFamily: 'Futura, sansSerif' }} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave}>LOGIN</Link></li>
                  <li><Link className="dropdown-item" to="/signup" style={{ fontFamily: 'Futura, sansSerif' }} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave}>SIGNUP</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
