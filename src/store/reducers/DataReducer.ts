import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  pathName: string[];
  name: string[];
  extract_code: string[];
  fuzzy_code: string[];
  visibleFields: {
    extractCode: boolean;
    fuzzyCode: boolean;
    name: boolean;
  };
  oil_discriptions: boolean;
  stock_zero_flag: boolean;
  stock_show_flag: boolean;
  price_show_flag: boolean;
}

const initialState: DataState = {
  pathName: [],
  name: [],
  extract_code: [],
  fuzzy_code: [],
  visibleFields: {
    extractCode: false,
    fuzzyCode: false,
    name: false,
  },
  oil_discriptions: false,
  stock_zero_flag: false,
  stock_show_flag: false,
  price_show_flag: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPathName: (state, action: PayloadAction<string>) => {
      const newKey = action.payload;
      if (!state.pathName.includes(newKey)) {
        state.pathName.push(newKey);
      }
    },
    removePathName: (state, action: PayloadAction<string[]>) => {
      state.pathName = state.pathName.filter(
        (key) => !action.payload.includes(key)
      );
    },

    deselectAllPathName(state, action: PayloadAction<string[]>) {
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

    toggleVisibleField: (
      state,
      action: PayloadAction<keyof DataState["visibleFields"]>
    ) => {
      state.visibleFields[action.payload] =
        !state.visibleFields[action.payload];
    },
    resetFields: (state) => {
      state.extract_code = [];
      state.fuzzy_code = [];
      state.name = [];
      state.visibleFields = {
        extractCode: false,
        fuzzyCode: false,
        name: false,
      };
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
    setPriceShowFlag(state, action: PayloadAction<boolean>) {
      state.price_show_flag = action.payload;
    },
  },
});

export const {
  setPathName,
  removePathName,
  deselectAllPathName,
  addName,
  addExtractCode,
  addFuzzyCode,
  toggleVisibleField,
  resetFields,
  setOilDiscriptions,
  setStockZeroFlag,
  setStockShowFlag,
  setPriceShowFlag,
} = dataSlice.actions;
export default dataSlice.reducer;
