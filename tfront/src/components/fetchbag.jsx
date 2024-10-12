import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bagitemsActions } from '../store/bagitemsslice'; 

function Fetchbag() {
  const { userId } = useSelector(state => state.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBagItems = async () => {
      try {
      
        const res = await fetch(`http://localhost:2700/api/bag/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch bag items");
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
  }, [userId, dispatch]); 

  return null;
}

export default Fetchbag;
