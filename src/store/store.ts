import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import { authApi } from "../auth/authService";
import customerReducer from "../auth/customerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
