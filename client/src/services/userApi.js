import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/user' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/',
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: '/',
        method: 'PATCH',
        body: user,
      }),
    }),
  }),
});

export const {} = userApi;
