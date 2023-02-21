import { apiSlice } from "./apiSlice";

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (credentials) => ({
        url: "/card/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getCards: builder.query({
      query: () => ({
        url: "/card",
        method: "GET",
      }),
    }),
    getCardById: builder.query({
      query: (id) => ({
        url: `/card/${id}`,
        method: "GET",
      }),
    }),
    deleteCardById: builder.mutation({
      query: (id) => ({
        url: `/card/${id}/delete`,
        method: "DELETE",
      }),
    }),
    getCardColors: builder.query({
      query: () => ({
        url: "/card/colors",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCardMutation,
  useGetCardsQuery,
  useGetCardByIdQuery,
  useDeleteCardByIdMutation,
  useGetCardColorsQuery,
} = cardApiSlice;
