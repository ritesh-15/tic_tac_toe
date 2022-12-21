import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { Board, Button, O, X } from "../../components";
import { useMutation, useQuery } from "react-query";
import { IUpdateGame, singleGameApi, updaateGameApi } from "../../api/game";
import useMessage from "../../app/slices/message/useMessage";
import { IGame } from "../../interfaces/game/IGame";
import useUser from "../../app/slices/user/useUser";
import { SocketContext } from "../../context/socket_context";

export type IGrid = Array<Array<string | null>>;

const useGame = () => {
  const router = useParams();
  const { socket } = useContext(SocketContext);
  const { user } = useUser();

  const [board, setBoard] = useState<IGrid>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [symbol, setSymbol] = useState<"X" | "O">("X");
  const [game, setGame] = useState<IGame | null>(null);
  const [gameResult, setGameResult] = useState<string>();

  const { newMessage } = useMessage();

  const emitJoinGame = () => {
    if (socket) {
      socket.emit("join_game", router.id);
    }
  };

  const { isLoading } = useQuery(
    "single-game",
    () => singleGameApi(router.id!!),
    {
      onSuccess: (data) => {
        setGame(data.game);
        setBoard(data.game.board);
        setSymbol(data.game.creator.id === user.id ? "X" : "O");
        setIsPlayerTurn(data.game.creator.id === user.id);
      },
      onError: (err) => {
        // @ts-ignore
        newMessage(error.response.data.message, true);
      },
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const updateGameMutation = useMutation(
    (data: IUpdateGame) => updaateGameApi(router.id!!, data),
    {
      onSuccess: (data) => {
        setGame(data.game);
      },
      onError: (err) => {
        // @ts-ignore
        newMessage(error.response.data.message, true);
      },
    }
  );

  // listen for game win event
  const listenGameWin = () => {
    socket?.on("game_win", (game) => {
      updateGameMutation.mutate({
        board: game.board,
        isFinished: true,
        isOpponentTurn: false,
        winnerId: game.winner ? game.winner.id : null,
      });

      if (game.winner === null) {
        setGameResult("Match is drawn!");
        return;
      }

      setGameResult(`${game.winner.name} is won the game 🥳🥳`);
    });
  };

  useEffect(() => {
    emitJoinGame();
    listenGameWin();

    return () => {
      socket?.off("game_win");
    };
  }, []);

  return {
    board,
    game,
    user,
    symbol,
    isPlayerTurn,
    setIsPlayerTurn,
    gameResult,
  };
};

const Game = () => {
  const { setIsPlayerTurn, game, user, symbol, isPlayerTurn, gameResult } =
    useGame();

  return (
    <section className="min-h-screen flex flex-col justify-around pb-4">
      <div className="mt-4">
        <Link to="/">
          <MdKeyboardArrowLeft className="text-4xl cursor-pointer mb-4" />
        </Link>
        <h1 className="font-bold text-3xl">
          Game with{" "}
          {game?.creator.id === user.id
            ? game?.opponent.name
            : game?.creator.name}
        </h1>
        <span className="mt-4 block">Your piece</span>
        <div className="mt-1">{symbol === "X" ? <X /> : <O />}</div>
      </div>
      <div className="mt-4">
        <div className="bg-primaryLight py-4 rounded-md px-2 text-center">
          {gameResult
            ? gameResult
            : isPlayerTurn
            ? "Your move"
            : game?.creator.id === user.id
            ? `waiting for ${game?.opponent.name} move`
            : `waiting for ${game?.creator.name} move`}
        </div>
      </div>

      {game && (
        <div className="mt-4">
          <Board
            isFinished={gameResult !== undefined}
            game={game}
            isPlayerTurn={isPlayerTurn}
            setIsPlayerTurn={setIsPlayerTurn}
            symbol={symbol}
          />
        </div>
      )}

      <Button
        type="submit"
        label="Submit!"
        className="bg-primary text-white mt-8"
      />
    </section>
  );
};

export default Game;
