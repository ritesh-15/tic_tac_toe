import { useState, useContext, useEffect } from "react";
import useUser from "../../app/slices/user/useUser";
import { SocketContext } from "../../context/socket_context";
import { IGame } from "../../interfaces/game/IGame";
import { IGrid } from "../../pages/game/Game";
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

const useBoard = ({
  game,
  isPlayerTurn,
  setIsPlayerTurn,
  symbol,
  setGameResult,
}: IProps) => {
  const { socket } = useContext(SocketContext);
  const [board, setBoard] = useState<IGrid>(game.board);
  const { user } = useUser();

  const move = (row: number, col: number) => {
    const newBoard = [...board];

    if (newBoard[row][col] == null) {
      newBoard[row][col] = symbol;
      setBoard(newBoard);
    }

    // emit update board event
    if (socket) {
      socket.emit("game_board_updated", newBoard);
    }

    const [currentPlayer, otherPlayer] = checkBoardStatus(newBoard);

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
  };

  // check if any player has win
  const checkBoardStatus = (board: IGrid) => {
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

  useEffect(() => {
    listenGameBoardUpdate();
    return () => {
      socket?.off("game_board_updated");
      socket?.off("game_win");
    };
  }, [socket]);

  return { move, board };
};

const Board: React.FC<IProps> = ({
  game,
  isPlayerTurn,
  setIsPlayerTurn,
  symbol,
  isFinished,
  setGameResult,
}) => {
  const { move, board } = useBoard({
    game,
    isPlayerTurn,
    setIsPlayerTurn,
    symbol,
    setGameResult,
    isFinished,
  });

  const getBorderStyle = (row: number, col: number): string => {
    if (col < 2 && row < 2) return "border-r-[5px] border-b-[5px]";
    if (col == 2 && row < 2) return "border-b-[5px]";
    if (row == 2 && col < 2) return "border-r-[5px]";
    return "";
  };

  return (
    <div className="relative w-full flex flex-col">
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
  );
};

export default Board;
