import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/registration",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    validateToken: builder.query({
      query: () => ({
        url: "/validate-token",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useValidateTokenQuery } =
  authApiSlice;
