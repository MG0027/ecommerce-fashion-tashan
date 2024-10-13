import axios from 'axios';
import { useEffect } from 'react';
import { bagitemsActions } from '../store/bagitemsslice';
import { useDispatch, useSelector } from 'react-redux';
import API_BASE_URL from '../config';
import BagSummary from '../components/bagsummary';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Bag = () => {
    const bagitems = useSelector((store) => store.bagitems);
    const { userId } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const ASSET_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://tashan-backend.onrender.com'
    : 'http://localhost:2700';
   
 

    useEffect(() => {
        const fetchBagItems = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/bag/${userId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch bagitems");
                }
                const bagitems = await res.json();
                dispatch(bagitemsActions.setBagItems(bagitems));
            } catch (error) {
                console.error(error);
            }
        };

        if (userId) {
            fetchBagItems();
        }
    }, [userId, dispatch,]);

    const handleRemoveFromCart = async (item) => {
        try {
            await axios.delete(`${API_BASE_URL}/bag/remove-from-bag`, {
                data: {
                    userId: userId,
                    productId: item.productId,
                    productName: item.productName,
                    productPrice: item.productPrice,
                }
            });
            dispatch(bagitemsActions.removeProductFromBag({
                productId: item.productId,
            }));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const handleButton = () => {
        navigate('/men');
        return;
    }

    return (
        <div>
            <h2 style={{
                fontFamily: 'Futura, sansSerif',
                color: 'black',
                textAlign: 'center',
                fontWeight: '400',
                fontSize: '30.6px',
                lineHeight: '30.6px',
                textRendering: 'optimizeSpeed',
            }}>YOUR BAG</h2>

            {bagitems.length === 0 ? (
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <div>
                        <p style={{ textAlign: '', fontFamily: 'Futura, sansSerif', marginTop: '5REM' }}>
                            HEYY, IT FEELS SO LIGHT HERE
                        </p>
                    </div>
                    <button type="button" className="btn btn-dark" style={{ fontFamily: 'Futura, sans-serif', }} onClick={handleButton}>
                        SHOP NOW
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {bagitems.map((item) => {
                            const imageUrl = `${ASSET_BASE_URL}${item.productImage}`;
                            return (
                                <div key={item.productId} className="card" style={{ width: "18rem", margin: "10px", border: 'none', position: 'relative' }}>
                                    <img src={imageUrl} className="card-img-top" alt={item.productName} />
                                    <h5 style={{ fontFamily: 'Futura, sans-serif', marginTop: '1rem', fontWeight: 'lighter', fontSize: '1rem' }}>
                                        {item.productName} ({item.quantity}) 
                                        <button style={{ marginLeft: '', border: 'none', backgroundColor: 'white' }}>
                                            <AiOutlineDelete style={{ marginLeft: '', fontSize: '1.6rem' }} onClick={() => handleRemoveFromCart(item)} />
                                        </button>
                                    </h5>
                                    <p style={{ fontFamily: 'Futura, sans-serif', marginTop: '-0.5rem', fontWeight: 'lighter', fontSize: '0.9rem' }}>
                                        INR {item.productPrice}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <BagSummary></BagSummary>
                </div>
            )}
        </div>
    );
};

export default Bag;
