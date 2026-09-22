import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { systemReducer } from "../features/system/systemSlice";

export const appStore = configureStore({
  reducer: { auth: authReducer, system: systemReducer },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
