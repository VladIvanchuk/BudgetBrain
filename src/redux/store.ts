import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";
import activePopUpReducer from "./popUpSlice";
import currencyStatusReducer from "./currencyStatus";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    activePopUp: activePopUpReducer,
    currencyStatus: currencyStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
