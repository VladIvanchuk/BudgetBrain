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
    updateUser: builder.mutation({
      query: (id) => ({
        url: `/user/1/edit`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUserBalanceQuery, useUpdateUserMutation } =
  userApiSlice;
