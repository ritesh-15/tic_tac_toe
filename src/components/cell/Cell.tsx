import { FC } from "react";
import { IGrid } from "../../pages/game/Game";
import O from "../o/O";
import X from "../x/X";

interface IProps {
  rowIndex: number;
  colIndex: number;
  grid: IGrid;
}

const useCell = (grid: IGrid) => {
  const move = (row: number, col: number) => {
    const newBoard = [...grid];
    const pos = grid[row][col];
    if (pos == "" || pos == null) {
      newBoard[row][col] = "X";
    }
    // TODO: handle move logic
  };
  return { move };
};

const Cell: FC<IProps> = ({ rowIndex, colIndex, grid }) => {
  const { move } = useCell(grid);

  const getBorderStyle = (): string => {
    if (colIndex < 2 && rowIndex < 2) return "border-r-[5px] border-b-[5px]";
    if (colIndex == 2 && rowIndex < 2) return "border-b-[5px]";
    if (rowIndex == 2 && colIndex < 2) return "border-r-[5px]";
    return "";
  };

  return (
    <div
      onClick={() => move(rowIndex, colIndex)}
      className={`w-[13rem] h-[9rem] flex items-center justify-center cursor-pointer border-primaryLight transition hover:bg-primaryLight ${getBorderStyle()}`}
    >
      {grid[rowIndex][colIndex] ? (
        grid[rowIndex][colIndex] == "X" ? (
          <X />
        ) : (
          <O />
        )
      ) : null}
    </div>
  );
};

export default Cell;
