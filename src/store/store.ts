import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./reducers/DataReducer";

const store = configureStore({
  reducer: {
    data: DataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
