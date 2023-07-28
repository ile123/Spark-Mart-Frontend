import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = 'http://localhost:8080/spark-mart/api'

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, lastName, phoneNumber, email, password, gender, role }: any, { rejectWithValue }) =>  {
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/auth/register`,
                { firstName, lastName, phoneNumber, email, password, gender, role },
                config
            )
        } 
        catch(error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }: any, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.post(
          `${backendURL}/auth/login`,
          { email, password },
          config
        );
        localStorage.setItem('userToken', String(data.token));
        const getConfig = {
          headers: { Authorization: `Bearer ${data.token}` }
        };
        const userInfo = await axios.get(`${backendURL}/auth/get-user-info`,
          getConfig
        );
        return userInfo.data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
)