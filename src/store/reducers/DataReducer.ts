import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  pathName: string[];
  name: string[];
  extract_code: string[];
}

const initialState: DataState = {
  pathName: [],
  name: [],
  extract_code: [],
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
    addName(state, action: PayloadAction<string>) {
      state.name = [action.payload];
    },
    addExtractCode(state, action: PayloadAction<string>) {
      state.extract_code = [action.payload];
    },
  },
});

export const { setPathName, removePathName, addName, addExtractCode } =
  dataSlice.actions;
export default dataSlice.reducer;
