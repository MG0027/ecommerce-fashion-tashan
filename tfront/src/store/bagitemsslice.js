import {createSlice} from "@reduxjs/toolkit";

const bagitemsSlice = createSlice({
  name: 'bagitems',
  initialState: [],
  reducers: {
    addInitialProducts: (state, action) => {
      state.push({
        productId: action.payload.productId,
        productName: action.payload.productName,
        productPrice: action.payload.productPrice,
        productImage: action.payload.productImage,
        quantity: action.payload.quantity
      });
    },
      removeProductFromBag(state, action) {
       
        return state.filter(item => item.productId !== action.payload.productId);
      },
    
    setBagItems(state, action) {
      return action.payload; 
    },
    clearCart(state) {
      return []; 
    },
    }
  }
);

export const bagitemsActions = bagitemsSlice.actions;

export default bagitemsSlice;