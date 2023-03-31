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
      query: () => ({
        url: `/user/edit`,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUserBalanceQuery, useUpdateUserMutation } =
  userApiSlice;
