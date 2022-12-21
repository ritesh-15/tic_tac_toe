import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setMessage, unSetMessage } from "./messageSlice";
import { useEffect } from "react";

export default function useMessage() {
  const dispatch = useDispatch();
  const { message, isError, isOpen } = useSelector(
    (state: RootState) => state.message
  );

  const newMessage = (message: string, isError: boolean = false) => {
    dispatch(setMessage({ message, isError }));
  };

  const clearMessage = () => {
    dispatch(unSetMessage());
  };

  let time: NodeJS.Timeout;

  useEffect(() => {
    if (message == "" && isOpen == false) return;
    time = setTimeout(clearMessage, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [isOpen]);

  return { message, isError, isOpen, newMessage, clearMessage };
}
