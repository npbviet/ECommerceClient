import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./StatePopup";

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
  },
});

export default store;
