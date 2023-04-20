import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {backendURL} from '../services/http';
export const homeApi = createApi({
  reducerPath: 'homeApi',
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

  }),
});

export const {useGetcategoriesQuery,use} = homeApi;
