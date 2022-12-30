import { configureStore } from "@reduxjs/toolkit";
import { CartItemsReducer } from "./cartItems";
import { showCartReducers } from "./showCart";
const store = configureStore({
  reducer: { showCart: showCartReducers, cartItems: CartItemsReducer },
});

export default store;
