import { createSlice } from "@reduxjs/toolkit";
import IUser from "../../interfaces/IUser";
import { PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: IUser | null;
  symbol: "X" | "O";
}

const initialState: IUserState = {
  user: null,
  symbol: "X",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<"X" | "O">) => {
      state.symbol = action.payload;
    },
  },
});

export const { setSymbol } = userSlice.actions;

export default userSlice.reducer;
