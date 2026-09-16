import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SystemState {
  initialized: boolean;
}

export const initialSystemState: SystemState = { initialized: false };

const systemSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
  },
});

export const { setInitialized } = systemSlice.actions;
export const systemReducer = systemSlice.reducer;
