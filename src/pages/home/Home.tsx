import { Button, Game, GameNotFound } from "../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQuery } from "react-query";
import { logoutApi } from "../../api/auth";
import useUser from "../../app/slices/user/useUser";
import { gamesApi } from "../../api/game";
import { useState } from "react";
import useMessage from "../../app/slices/message/useMessage";
import { IGame } from "../../interfaces/game/IGame";

const useHome = () => {
  const navigate = useNavigate();
  const { logoutUser } = useUser();
  const { newMessage } = useMessage();
  const [games, setGames] = useState<IGame[]>([]);

  const { isLoading } = useQuery("games", gamesApi, {
    onError: (error) => {
      // @ts-ignore
      newMessage(error.response.data.message, true);
    },
    onSuccess: (data) => {
      setGames(data.games);
    },
  });

  const logoutMutation = useMutation(logoutApi, {
    onSuccess: (data) => {
      navigate("/");
      logoutUser();
    },
    onError: (error) => {
      // @ts-ignore
      newMessage(error.response.data.message, true);
    },
  });

  const logout = () => {
    console.log("Logout");
    logoutMutation.mutate();
  };

  return { logout, games, isLoading };
};

const Home = () => {
  const { logout, games } = useHome();

  return (
    <section className="h-screen pb-4 flex flex-col relative">
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Games</h1>

        <div className="">
          <Button
            onClick={() => logout()}
            label="Log out"
            className="bg-secondary"
          />
        </div>
      </div>

      {games.length ? (
        <div className="flex flex-col gap-6 mt-4 overflow-y-auto">
          {games.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <GameNotFound />
      )}

      <div className="absolute right-0 bottom-4">
        <Link to="/new-game">
          <Button
            icon={<AiOutlinePlus className="text-xl" />}
            label="New Game"
            className="bg-btnBg text-white"
          />
        </Link>
      </div>
    </section>
  );
};

export default Home;
