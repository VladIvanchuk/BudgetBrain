import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RootState {
  auth: {
    token: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://budgetbrain.azurewebsites.net/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
