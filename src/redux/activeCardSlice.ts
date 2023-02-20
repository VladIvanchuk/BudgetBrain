import { IActiveCardSlice } from "../types/card";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: IActiveCardSlice = {
  id: null,
  isOpen: false,
};

const activeCardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<{ id: number | null }>) => {
      const { id } = action.payload;
      state.id = id;
      state.isOpen = true;
    },
    removeActiveCard: (state) => {
      state.id = null;
      state.isOpen = false;
    },
  },
});

export const { setActiveCard, removeActiveCard } = activeCardSlice.actions;
export const selectActiveCard = (state: RootState) => state.activeCard.id;
export const selectIsCardOpen = (state: RootState) => state.activeCard.isOpen;

export default activeCardSlice.reducer;
