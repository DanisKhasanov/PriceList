import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  pathName: string[];
  name: string[];
  extract_code: string[];
  fuzzy_code: string[];
  oil_discriptions: boolean;
  stock_zero_flag: boolean;
  stock_show_flag: boolean; 
}

const initialState: DataState = {
  pathName: [],
  name: [],
  extract_code: [],
  fuzzy_code: [],
  oil_discriptions: false,
  stock_zero_flag: false,
  stock_show_flag: false,
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
    addFuzzyCode(state, action: PayloadAction<string>) {
      state.fuzzy_code = [action.payload];
    },
    setOilDiscriptions(state, action: PayloadAction<boolean>) {
      state.oil_discriptions = action.payload;
    },
    setStockZeroFlag(state, action: PayloadAction<boolean>) {
      state.stock_zero_flag = action.payload;
    },
    setStockShowFlag(state, action: PayloadAction<boolean>) {
      state.stock_show_flag = action.payload;
    },
  },
});

export const {
  setPathName,
  removePathName,
  addName,
  addExtractCode,
  addFuzzyCode,
  setOilDiscriptions,
  setStockZeroFlag,
  setStockShowFlag,
} = dataSlice.actions;
export default dataSlice.reducer;
