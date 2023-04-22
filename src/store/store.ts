import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'
import { authApi } from '../auth/authService'
//ovdje dodaj bilo sta vezano za informacije koje se dijele kroz vise komponenti, za service koristi RTK i kopiraj korake ko za auth
const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})
export default store