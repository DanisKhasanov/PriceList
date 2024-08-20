import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  pathName: string[];
}

const initialState: DataState = {
  pathName: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPathName(state, action: PayloadAction<string>) {
      if (!state.pathName.includes(action.payload)) {
        state.pathName.push(action.payload);
      }
    },
    removePathName(state, action: PayloadAction<string[]>) {
      state.pathName = action.payload.map((path) => `Каталог/${path}`);
    },
  },
});

export const { setPathName, removePathName } = dataSlice.actions;
export default dataSlice.reducer;
