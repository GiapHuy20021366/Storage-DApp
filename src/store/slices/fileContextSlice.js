import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
};

const fileContextSlice = createSlice({
  name: "fileContext",
  initialState,
  reducers: {
    set: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { set } = fileContextSlice.actions;
export default fileContextSlice.reducer;
