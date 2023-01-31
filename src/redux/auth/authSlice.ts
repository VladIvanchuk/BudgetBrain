import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../types/api/types";
import { RootState } from "../store";

const initialState: IAuth = {
  token: null,
  errorMessage: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: AnyAction) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      localStorage.setItem("jwtToken", accessToken);
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("jwtToken");
    },
    setError: (state, action: AnyAction) => {
      state.errorMessage = action.payload;
    },
    setSuccess: (state, action: AnyAction) => {
      state.successMessage = action.payload;
    },
    resetMessage: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
});

export const { setCredentials, logOut, resetMessage, setSuccess, setError } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth?.token;

export const selectErrorMessage = (state: RootState) => state.auth?.errorMessage;
export const selectSuccessMessage = (state: RootState) => state.auth?.successMessage;
