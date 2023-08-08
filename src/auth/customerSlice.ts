import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

const initialState = {
  cart: {},
  productsLoaded: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const newJson = {
        ...state.cart,
        [payload.productId]: payload.amount,
      };
      state.cart = newJson;
      state.productsLoaded = true;
      cookies.set(payload.userId, JSON.stringify(newJson), {
        expires: new Date(Date.now() + 1_800_000),
        sameSite: "none",
        secure: true,
      });
    },
    removeFromCart: (state, { payload }) => {
      const json = state.cart;
      delete json[payload.productId];
      state.cart = json;
      cookies.set(payload.userId, JSON.stringify(json), {
        expires: new Date(Date.now() + 1_800_000),
        sameSite: "none",
        secure: true,
      });
    },
    deleteCart: (state) => {
      state.cart = {};
      state.productsLoaded = false;
    },
    getFromCookiesToCart: (state, { payload }) => {
      const allCookies = cookies.getAll();
      if (!state.productsLoaded) {
        if (allCookies.hasOwnProperty(payload.userId)) {
          state.cart = allCookies[payload.userId];
          state.productsLoaded = true;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, deleteCart, getFromCookiesToCart } =
  customerSlice.actions;
export default customerSlice.reducer;
