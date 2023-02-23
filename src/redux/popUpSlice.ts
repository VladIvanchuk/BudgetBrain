import { IPopUpSlice } from "../types/popup";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: IPopUpSlice = {
  id: null,
  isOpen: false,
};

const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    setActivePopUp: (state, action: PayloadAction<{ id: number | null }>) => {
      const { id } = action.payload;
      state.id = id;
      state.isOpen = true;
    },
    removeActivePopUp: (state) => {
      state.id = null;
      state.isOpen = false;
    },
  },
});

export const { setActivePopUp, removeActivePopUp } = popUpSlice.actions;
export const selectActivePopUp = (state: RootState) => state.activePopUp.id;
export const selectIsPopUpOpen = (state: RootState) => state.activePopUp.isOpen;

export default popUpSlice.reducer;
