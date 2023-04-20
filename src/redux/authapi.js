import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {backendURL} from '../services/http';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().user.userToken;
      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: builder => ({
    getEmailConfirm: builder.mutation({
      query: token => ({
        url: '/user/confirm',
        method: 'POST',
        body: {confirmation_token: token},
      }),
    }),
    getPhoneConfirm: builder.mutation({
      query: data => ({
        url: '/phone/confirm',
        method: 'POST',
        body: data,
      }),
    }),
    verifyPhone: builder.mutation({
      query: token => ({
        url: '/phone/verify',
        method: 'POST',
        body: {token: token},
      }),
    }),
    getcategories: builder.query({
      query: (data)=> ({
        url: '/categories',
        method: 'GET',
        params: {
          scope: data
        }
      }),
    }),
    getcategory: builder.query({
      query: data => ({
        url: `/category/${data}`,
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetEmailConfirmMutation,
  useVerifyPhoneMutation,
  useGetPhoneConfirmMutation,
  useGetcategoriesQuery,
  useGetcategoryQuery

} = authApi;
