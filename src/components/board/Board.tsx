import { useState, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { IUpdateGame, updaateGameApi } from "../../api/game";
import useMessage from "../../app/slices/message/useMessage";
import useUser from "../../app/slices/user/useUser";
import { SocketContext } from "../../context/socket_context";
import { IGame } from "../../interfaces/game/IGame";
import { IGrid } from "../../pages/game/Game";
import Button from "../button/Button";
import O from "../o/O";
import X from "../x/X";

interface IProps {
  game: IGame;
  symbol: string;
  isPlayerTurn: boolean;
  setIsPlayerTurn(value: boolean): void;
  isFinished: boolean;
  setGameResult(value: string): void;
}

const getBorderStyle = (row: number, col: number): string => {
  if (col < 2 && row < 2) return "border-r-[5px] border-b-[5px]";
  if (col == 2 && row < 2) return "border-b-[5px]";
  if (row == 2 && col < 2) return "border-r-[5px]";
  return "";
};

const useBoard = ({ game, setIsPlayerTurn, symbol, setGameResult }: IProps) => {
  const { socket } = useContext(SocketContext);
  const [board, setBoard] = useState<IGrid>(game.board);
  const { user } = useUser();
  const { newMessage } = useMessage();
  const [newMove, setNewMove] = useState<Array<number | null>>([null, null]);

  const updateGameMutation = useMutation(
    (data: IUpdateGame) => updaateGameApi(game.id, data),
    {
      onSuccess: () => {
        newMessage("Game syncronized successfully!");
      },
      onError: (err) => {
        // @ts-ignore
        newMessage(err.response.data.message);
      },
    }
  );

  // move taken by the user
  const move = (row: number, col: number) => {
    if (newMove[0] !== null && newMove[1] !== null) {
      return newMessage(
        "You have already taken you move, now please submit the move!",
        true
      );
    }

    const newBoard = [...board];
    if (newBoard[row][col] == null) {
      newBoard[row][col] = symbol;
      setNewMove([row, col]);
      setBoard(newBoard);
    }
  };

  // update the board in the database
  const handleBtnClick = () => {
    if (newMove[0] === null && newMove[1] == null) {
      newMessage("Please take your move first!", true);
      return;
    }

    // emit update board event
    if (socket) {
      socket.emit("game_board_updated", {
        gameId: game.id,
        board,
        isOpponentTurn: game.creator.id === user?.id ? true : false,
      });

      const [currentPlayer, otherPlayer] = checkBoardStatus(board, symbol);

      if (currentPlayer && otherPlayer) {
        // game is drawn
        socket?.emit("game_win", {
          winner: null,
          board,
        });
        setGameResult("Match is draw!");
      } else if (currentPlayer && !otherPlayer) {
        // current player won the game
        socket?.emit("game_win", {
          winner: user,
          board,
        });

        setGameResult("You win!");
      }

      setIsPlayerTurn(false);
      setNewMove([null, null]);
    }
  };

  // check if any player has win
  const checkBoardStatus = (board: IGrid, symbol: string) => {
    // check for row winning
    for (let idx = 0; idx < board.length; idx++) {
      if (board[idx].every((value) => value && value === symbol))
        return [true, false];

      if (board[idx].every((value) => value && value === symbol))
        return [false, true];
    }

    // check for column winning
    for (let idx = 0; idx < board.length; idx++) {
      let cols = [];
      for (let col = 0; col < board[idx].length; col++) {
        cols.push(board[col][idx]);
      }

      if (cols.every((value) => value && value === symbol))
        return [true, false];

      if (cols.every((value) => value && value !== symbol))
        return [false, true];
    }

    // check for diagonal winning
    if (board[1][1]) {
      if (board[0][0] === board[1][1] && board[1][1] == board[2][2]) {
        if (board[1][1] === symbol) {
          return [true, false];
        } else {
          return [false, true];
        }
      }

      if (board[2][0] === board[1][1] && board[1][1] == board[0][2]) {
        if (board[1][1] === symbol) {
          return [true, false];
        } else {
          return [false, true];
        }
      }
    }

    // check for draw
    if (board.every((val) => val.every((it) => it !== null)))
      return [true, true];

    return [false, false];
  };

  // listen game board updated event
  const listenGameBoardUpdate = () => {
    socket?.on("game_board_updated", (board) => {
      setBoard(board);
      setIsPlayerTurn(true);
    });
  };

  // listen for game win event
  const listenForGameWin = () => {
    if (socket) {
      socket.on("game_win", (game) => {
        console.log(game);

        // update the database
        updateGameMutation.mutate({
          winner: game.winner ? game.winner.id : null,
          isFinished: true,
          board: game.board,
        });

        // set the game result
        if (game.winner === null) {
          setGameResult("Match is draw!");
          return;
        }
        setGameResult(`${game.winner.name} has won the game 🥳🥳`);
      });

      socket.off("game_win", () => {});
    }
  };

  useEffect(() => {
    listenGameBoardUpdate();
    listenForGameWin();
    return () => {
      socket?.off("game_win", () => {});
      socket?.off("game_board_updated", () => {});
    };
  }, []);

  return { move, board, handleBtnClick, updateGameMutation, user };
};

const Board: React.FC<IProps> = (props) => {
  const { move, board, handleBtnClick, updateGameMutation, user } =
    useBoard(props);
  const { isPlayerTurn, isFinished, game } = props;

  return (
    <div className="w-full flex flex-col">
      <div className="relative">
        {(!isPlayerTurn || isFinished) && (
          <div className="w-full cursor-default h-full absolute left-0 right-0 bottom-0 top-0 z-40" />
        )}

        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="w-full flex">
              {row.map((col, colIndex) => (
                <div
                  key={rowIndex + colIndex}
                  onClick={() => move(rowIndex, colIndex)}
                  className={`w-[13rem] h-[9rem] flex items-center justify-center cursor-pointer border-primaryLight transition ${
                    isPlayerTurn && "hover:bg-primaryLight"
                  } ${getBorderStyle(rowIndex, colIndex)}`}
                >
                  {board[rowIndex][colIndex] ? (
                    board[rowIndex][colIndex] == "X" ? (
                      <X />
                    ) : (
                      <O />
                    )
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {!isFinished && (
        <div className="mt-8">
          <Button
            isLoading={!isPlayerTurn}
            onClick={handleBtnClick}
            type="submit"
            label={
              isPlayerTurn
                ? "Submit!"
                : game?.creator.id === user?.id
                ? `waiting for ${game?.opponent.name} move`
                : `waiting for ${game?.creator.name} move`
            }
            className="bg-primary text-white"
          />
        </div>
      )}
    </div>
  );
};

export default Board;
