import { ICurrencyStatus } from "../types/popup";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: ICurrencyStatus = {
  isSuccess: false,
};

const currencyStatus = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    setCurrencyStatus: (
      state,
      action: PayloadAction<{ isSuccess: boolean | undefined }>
    ) => {
      state.isSuccess = action.payload.isSuccess;
    },
  },
});

export const { setCurrencyStatus } = currencyStatus.actions;
export const selectCurrencyStatus = (state: RootState) => state.currencyStatus.isSuccess;

export default currencyStatus.reducer;
