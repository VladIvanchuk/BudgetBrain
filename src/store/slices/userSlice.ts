import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserCredentials {
  email: string;
  password: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserInfo | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    registerStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    registerSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
