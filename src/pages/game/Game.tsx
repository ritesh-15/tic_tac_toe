import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import { Board, Button, X } from "../../components";

export type IGrid = Array<Array<string | null>>;

const useGame = () => {
  const [grid, setGrid] = useState<IGrid>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  return { grid };
};

const Game = () => {
  const { grid } = useGame();

  return (
    <section className="min-h-screen flex flex-col justify-around pb-4">
      <div className="mt-4">
        <Link to="/">
          <MdKeyboardArrowLeft className="text-4xl cursor-pointer mb-4" />
        </Link>
        <h1 className="font-bold text-3xl">Game with Tanmay</h1>
        <span className="mt-4 block">Your piece</span>
        <div className="mt-1">
          <X />
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-primaryLight py-4 rounded-md px-2 text-center">
          Your move
        </div>
      </div>

      <div className="mt-4">
        <Board grid={grid} />
      </div>

      <Button
        type="submit"
        label="Submit!"
        className="bg-primary text-white mt-8"
      />
    </section>
  );
};

export default Game;
