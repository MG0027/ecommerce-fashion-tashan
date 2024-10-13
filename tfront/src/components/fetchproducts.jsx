import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../store/productslice";
import { fetchStatusActions } from "../store/fetchingstatusslice";
import API_BASE_URL from "../config";

const FetchProducts = () => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((store) => store.fetchStatus);
 
  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    // const controller = new AbortController();
    // const signal = controller.signal;
    dispatch(fetchStatusActions.markFetchingStarted());
    fetch(`${API_BASE_URL}/add`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then(( products ) => {
       
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(productsActions.addInitialProducts(products)); 
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });

   
    // return () => {
    //   controller.abort();
    // };
  },  [fetchStatus]); 

  return (<></>); 
};

export default FetchProducts;
