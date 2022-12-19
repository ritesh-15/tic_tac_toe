import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateAccount, Game, Home, Login, NewGame, Splash } from "./pages";

const routes = createBrowserRouter([
  {
    path: "create-account",
    element: <CreateAccount />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/new-game",
    element: <NewGame />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

const App = () => {
  return (
    <main className="w-[95%] mx-auto max-w-[650px] bg-white">
      <RouterProvider router={routes} />
    </main>
  );
};

export default App;
