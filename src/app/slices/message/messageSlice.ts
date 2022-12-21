import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMessageState {
  isError: boolean;
  message: string;
  isOpen: boolean;
}

const initialState: IMessageState = {
  isError: false,
  message: "",
  isOpen: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<{ message: string; isError?: boolean }>
    ) => {
      state.message = action.payload.message;
      state.isError = action.payload.isError || false;
      state.isOpen = true;
    },
    unSetMessage: (state) => {
      state.isError = false;
      state.isOpen = false;
    },
  },
});

export const { setMessage, unSetMessage } = messageSlice.actions;

export default messageSlice.reducer;
