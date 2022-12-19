import { useState } from "react";
import { IGrid } from "../../pages/game/Game";
import Cell from "../cell/Cell";

interface IProps {
  grid: IGrid;
}

const useBoard = (grid: IGrid) => {
  const move = (row: number, col: number) => {
    const pos = grid[row][col];
    if (pos == "" || pos == null) {
      grid[row][col] = "X";
    }
    // TODO: handle move logic
  };
  return { move };
};

const Board: React.FC<IProps> = ({ grid }) => {
  const { move } = useBoard(grid);

  return (
    <div className="relative w-full flex flex-col">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="w-full flex">
            {row.map((col, colIndex) => (
              <Cell
                grid={grid}
                key={colIndex}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
