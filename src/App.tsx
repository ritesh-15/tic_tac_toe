import { BrowserRouter, Route, Routes } from "react-router-dom";
import useUser from "./app/slices/user/useUser";
import { CreateAccount, Game, Home, Login, NewGame, Splash } from "./pages";
import Protected from "./routes/Protected.routes";
import { useEffect, useState, useContext } from "react";
import { infoApi } from "./api/auth";
import { Loading, Message } from "./components";
import { SocketContext } from "./context/socket_context";

const App = () => {
  const { setUserState } = useUser();
  const [loading, setLoading] = useState(false);

  useContext(SocketContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await infoApi();
        setUserState(data.user);
      } catch (error) {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="w-[95%] mx-auto max-w-[650px] bg-white relative">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Protected isAuthRoute />}>
            <Route path="" element={<Splash />} />
          </Route>

          <Route path="/login" element={<Protected isAuthRoute />}>
            <Route path="" element={<Login />} />
          </Route>

          <Route path="/create-account" element={<Protected isAuthRoute />}>
            <Route path="" element={<CreateAccount />} />
          </Route>

          <Route path="/home" element={<Protected />}>
            <Route path="" element={<Home />} />
          </Route>

          <Route path="/new-game" element={<Protected />}>
            <Route path="" element={<NewGame />} />
          </Route>

          <Route path="/game/:id" element={<Protected />}>
            <Route path="" element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Message />
    </main>
  );
};

export default App;
