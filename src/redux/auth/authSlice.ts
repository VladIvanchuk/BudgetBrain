import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../types/api/types";
import { RootState } from "../store";

const initialState: IAuth = {
  token: null,
  message: {
    text: "",
    type: "",
  },
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
      state.message.text = action.payload;
      state.message.type = "error";
    },
    setSuccess: (state, action: AnyAction) => {
      state.message.text = action.payload;
      state.message.type = "success";
    },
    resetMessage: (state) => {
      state.message.text = "";
    },
  },
});

export const { setCredentials, logOut, resetMessage, setSuccess, setError } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth?.token;

export const selectMessage = (state: RootState) => state.auth?.message.text;
export const selectMessageType = (state: RootState) => state.auth?.message.type;
