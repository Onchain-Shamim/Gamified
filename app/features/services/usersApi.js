import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signInApi = createApi({
  reducerPath: 'signInApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/v1/users/' ,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    }
  
  }),
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
    checkLoggedInStatus: builder.query({
      query: () => ({
        url: 'check_logged_in_status',
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: 'update_user_profile',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useCheckLoggedInStatusQuery, useUpdateProfileMutation } = signInApi;
