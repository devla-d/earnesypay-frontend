import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initState {
  currentpage: string;
}

const initialState: initState = {
  currentpage: "Login",
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<string>) => {
      state.currentpage = action.payload;
    },
  },
});

export const { changePage } = pagesSlice.actions;

export default pagesSlice.reducer;
