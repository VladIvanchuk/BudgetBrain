import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserBalance: builder.query({
      query: () => ({
        url: "/user/balance",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUserBalanceQuery } = userApiSlice;
