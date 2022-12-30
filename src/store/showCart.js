import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showCart: false,
  notification: null,
};
const showCartSlice = createSlice({
  name: "showCart",
  initialState: initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },

    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const showCartActions = showCartSlice.actions;
export const showCartReducers = showCartSlice.reducer;
