import { configureStore } from "@reduxjs/toolkit";
import { systemReducer } from "../features/system/systemSlice";

export const appStore = configureStore({
  reducer: { system: systemReducer },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
