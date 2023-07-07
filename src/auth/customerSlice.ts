import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const getProductsIfSavedToCookie = () => {
  const cookies = new Cookies();
  const allCookies = cookies.getAll();
  if (Object.keys(allCookies).length > 0) {
    const allCookies = Object.entries(cookies.getAll()).map(
      ([name, value]) => ({ name, value })
    );
    return {
      cart: allCookies,
      numberOfProducts: allCookies.length,
    };
  } else {
    return {
      cart: [],
      numberOfProducts: 0,
    };
  }
};

const cookies = new Cookies();

const initialState = getProductsIfSavedToCookie();

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const index = state.cart.findIndex(
        (item: any) => item.productId === payload.productId
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        state.cart.push(payload);
        const userId = payload.userId;
        const productId = payload.productId;
        const amount = payload.amount;
        const value = { productId: amount};
        cookies.set(
          userId,
          value,
          {
            expires: new Date(Date.now() + 900_000),
            sameSite: "none",
            secure: true,
          }
        );
      } else {
        state.cart.push(payload);
        state.numberOfProducts++;
        const userId = payload.userId;
        const productId = payload.productId;
        const amount = payload.amount;
        const value = { productId: amount};
        cookies.set(
          userId,
          value,
          {
            expires: new Date(Date.now() + 900_000),
            sameSite: "none",
            secure: true,
          }
        );
      }
    },
    removeFromCart: (state, { payload }) => {
      const index = state.cart.findIndex((item: any) => item.id === payload.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
      state.numberOfProducts--;
      cookies.remove(payload.id, { path: "/" });
    },
    deleteCart: (state, { payload }) => {
      /*const cookieNames = cookies.getAll();
      cookieNames.forEach((cookie: any) => {
        if (cookie === payload.userId && cookieNames[cookie].productId === payload.productId) {
          cookies.remove(cookie);
        }
      });*/
      state.cart = [];
      state.numberOfProducts = 0;
    },
  },
});

export const { addToCart, removeFromCart, deleteCart } = customerSlice.actions;
export default customerSlice.reducer;
