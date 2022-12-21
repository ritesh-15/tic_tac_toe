import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./slices/message/messageSlice";
import userSlice from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
