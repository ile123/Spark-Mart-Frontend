import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/spark-mart/api/',
    prepareHeaders: (headers, { getState }) => {
      //@ts-ignore
      const token = getState().auth.userToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: () => ({
        url: 'auth/get-user-info',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDetailsQuery } = authApi