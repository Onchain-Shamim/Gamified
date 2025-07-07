import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signInApi = createApi({
  reducerPath: 'signInApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/users/' }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: 'register-user',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = signInApi;
