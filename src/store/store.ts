import { configureStore, createSlice } from "@reduxjs/toolkit";

// create a slice for the authentication data
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    email: "",
    name: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

// create the store with the auth slice
const store = configureStore({
  reducer: authSlice.reducer,
});

// export the actions from the auth slice
export const { setToken, setUser } = authSlice.actions;

export default store;
