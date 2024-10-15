import { useSelector } from "react-redux";

import Mencategory from "../components/mencategory";
import LoadingSpinner from "../components/loadingspinner";

function Men() {
  const products = useSelector((store) => store.products);

  if (!products || products.length === 0) {
    return (<LoadingSpinner></LoadingSpinner>); 
  }

 
  

  return (<>
    <Mencategory/>
    </>
   
  );
}

export default Men;
