import React, { useState } from 'react';
import axios from 'axios';
import { IoIosAdd } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { bagitemsActions } from '../store/bagitemsslice';
import { MdDeleteForever } from "react-icons/md";

const AddToBag = ({ product }) => {
  console.log(product);
  if (!product) {
    return ; 
}
  const bagitems = useSelector((store) => store.bagitems); 
  const [isInCart, setIsInCart] = useState(false); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { isLoggedIn, userId } = useSelector(state => state.user);
  console.log(userId);


  const productInCart = bagitems.some(item => item.productId === product._id);
 

  const addToCart = async () => {
    if (!userId || !isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:2700/api/add-to-bag', {
        userId: userId,
        productId: product._id,
        quantity: 1,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image
      });
      setIsInCart(true);
      dispatch(bagitemsActions.addInitialProducts({
        productId: product._id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        quantity: 1
      }));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async () => {
    try {
      await axios.delete(`http://localhost:2700/api/remove-from-bag`, {
        data: {
          userId: userId,
          productId: product._id
        }
      });
      setIsInCart(false);
      dispatch(bagitemsActions.removeProductFromBag({
        productId: product._id
      }));
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  return (
    <div>
   
      {(productInCart  )?(
        <button
          type="button"
          className="btn btn-dark"
          style={{
            fontFamily: 'Futura, sansSerif',
            borderRadius: '2rem',
            display: 'block',
            width: '100%',
            fontWeight: "lighter"
          }}
          onClick={removeFromCart}
        >
          <MdDeleteForever  style={{ fontSize: '1.2rem', marginTop: '-0.2rem', marginRight: '0.2rem' }} />
          REMOVE
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-dark"
          style={{
            fontFamily: 'Futura, sansSerif',
            borderRadius: '2rem',
            display: 'block',
            width: '100%',
          }}
          onClick={addToCart}
        >
          <IoIosAdd style={{ fontSize: '1.4rem' }} />
          ADD TO BAG
        </button>
      )}
    </div>
  );
};

export default AddToBag;
