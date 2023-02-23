import { apiSlice } from "./apiSlice";

export const operationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOperation: builder.mutation({
      query: (credentials) => ({
        url: "/operation/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getOperations: builder.query({
      query: () => ({
        url: "/operation",
        method: "GET",
      }),
    }),
    getOperationById: builder.query({
      query: (id) => ({
        url: `/operation/${id}`,
        method: "GET",
      }),
    }),
    deleteOperationById: builder.mutation({
      query: (id) => ({
        url: `/operation/${id}/delete`,
        method: "DELETE",
      }),
    }),
    getCategories: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOperationMutation,
  useGetOperationsQuery,
  useGetOperationByIdQuery,
  useDeleteOperationByIdMutation,
  useGetCategoriesQuery,
} = operationApiSlice;
