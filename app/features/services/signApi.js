import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signInApi = createApi({
  reducerPath: 'signInApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: 'sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: 'sign-up',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = signInApi;
