import { Navigate, Outlet } from "react-router-dom";
import useUser from "../app/slices/user/useUser";

interface IProps {
  isAuthRoute?: boolean;
}

export default function Protected(props: IProps) {
  const { user } = useUser();

  if (props.isAuthRoute) {
    return user ? <Navigate to="/home" /> : <Outlet />;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
}
