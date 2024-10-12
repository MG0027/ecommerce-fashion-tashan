import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./productslice";
import fetchStatusSlice from "./fetchingstatusslice";
import { useReducer } from "react";
import userReducer from './userslice';
import bagitemsSlice from "./bagitemsslice";

const tashanStore = configureStore({
  reducer:{
    products: productsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    user: userReducer,
    bagitems:bagitemsSlice.reducer,
  }
});

export default tashanStore;