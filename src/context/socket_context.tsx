import { createContext, ReactNode, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

interface IProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketState>({ socket: null });

const SocketContextProvider = ({ children }: IProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connection = io(import.meta.env.VITE_SERVER_URL);
    setSocket(connection);
    console.log("Socket connection established!");
    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
