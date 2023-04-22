import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './authActions'
import { userLogin } from './authActions'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: false,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // ...logout reducer
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    //@ts-ignore
    [userLogin.pending]: (state: any) => {
      state.loading = true
      state.error = null
    },
    //@ts-ignore
    [userLogin.fulfilled]: (state: any, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    //@ts-ignore
    [userLogin.rejected]: (state: any, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //@ts-ignore
    [registerUser.pending]: (state: any) => {
      state.loading = true
      state.error = null
    },
    //@ts-ignore
    [registerUser.fulfilled]: (state: any, { payload }) => {
      state.loading = false
      state.success = true
    },
    //@ts-ignore
    [registerUser.rejected]: (state: any, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
});

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer