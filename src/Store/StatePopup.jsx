import { createSlice } from "@reduxjs/toolkit";

const initialPopupState = {
  isOpen: false,
};

const popupSlice = createSlice({
  name: "Popup",
  initialState: initialPopupState,
  reducers: {
    SHOW_POPUP(state) {
      state.isOpen = true;
    },
    HIDE_POPUP(state) {
      state.isOpen = false;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice;
