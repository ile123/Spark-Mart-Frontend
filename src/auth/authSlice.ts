import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";
import jwt_decode from "jwt-decode";
import axios from "axios";

const getUserToken = () => {
  if (!localStorage.getItem("userToken")) return null;
  const token: any = localStorage.getItem("userToken");
  const decodedToken: any = jwt_decode(token);
  if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
    localStorage.removeItem("userToken");
    return null;
  }
  return token;
};

const userToken = getUserToken();

const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      axios.post("http://localhost:8080/spark-mart/api/auth/logout");
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        //@ts-ignore
        state.error = payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        //@ts-ignore
        state.error = payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
