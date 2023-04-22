import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/spark-mart/api/',
    prepareHeaders: (headers, { getState }) => {
      //@ts-ignore
      const token = getState().auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: 'auth/getUserByToken',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserDetailsQuery } = authApi