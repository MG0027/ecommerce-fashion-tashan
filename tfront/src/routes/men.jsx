import { useSelector } from "react-redux";

import Mencategory from "../components/mencategory";

function Men() {
  const products = useSelector((store) => store.products);

  if (!products || products.length === 0) {
    return <p>Loading products...</p>; 
  }

 
  

  return (<>
    <Mencategory/>
    </>
   
  );
}

export default Men;
