import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    addNewUser: builder.mutation({
      query: body => ({
        url: `/users/signup`,
        method: 'POST',
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: body => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    currentUser: builder.query({
      query: () => `/users/current`,
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useCurrentUserQuery,
} = userApi;
