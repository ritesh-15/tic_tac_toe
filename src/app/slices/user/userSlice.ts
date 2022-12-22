import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../../interfaces/IUser";

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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    unSetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setSymbol, setUser, unSetUser } = userSlice.actions;

export default userSlice.reducer;
