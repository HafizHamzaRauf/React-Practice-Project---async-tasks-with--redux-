import { createSlice } from "@reduxjs/toolkit";
import { showCartActions } from "./showCart";
const initialState = { items: [], totalQuantity: 0, changed: false };

const cartItems = createSlice({
  name: "CartItems",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
    },
    removeItemToCart(state, action) {
      state.totalQuantity--;
      state.changed = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.totalPrice -= existingItem.price;

        existingItem.quantity--;
      }
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showCartActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending the Cart data",
      })
    );

    const sendRequest = async () => {
      const resposne = await fetch(
        "https://react-complete-guide-9e243-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,

            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!resposne.ok) {
        throw new Error("Sending Cart  data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showCartActions.setNotification({
          status: "success",
          title: "Success...",
          message: "Sending the Cart data Succeeded",
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.setNotification({
          status: "error",
          title: "Error...",
          message: "Sending the Cart data Failed",
        })
      );
    }
  };
};

export const CartItemsActions = cartItems.actions;
export const CartItemsReducer = cartItems.reducer;
export const fetchCartData = () => {
  return async (dispatch) => {
    const request = async () => {
      const response = await fetch(
        "https://react-complete-guide-9e243-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await request();

      dispatch(
        CartItemsActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.setNotification({
          status: "error",
          title: "Error...",
          message: "fetching the Cart data Failed",
        })
      );
    }
  };
};
