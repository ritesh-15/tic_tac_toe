import { useDispatch, useSelector } from "react-redux";
import IUser from "../../../interfaces/IUser";
import { RootState } from "../../store";
import { setUser, unSetUser } from "./userSlice";

export default function useUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const setUserState = (data: IUser) => dispatch(setUser(data));
  const logoutUser = () => dispatch(unSetUser());

  return { user, setUserState, logoutUser };
}
