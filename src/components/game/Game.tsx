import Button from "../button/Button";
import { Link } from "react-router-dom";
import { FC } from "react";

const Game: FC = () => {
  return (
    <div className="bg-white shadow-lg py-3 px-2 rounded-md">
      <h1 className="font-bold">Game with Tanmay</h1>
      <p className="mt-2 font-light">
        Tanmay just made their move! It’s your turn to play now.
      </p>
      <small>9th June 2022, 3:15pm</small>
      <Link to="/game">
        <Button
          type="submit"
          label="View game"
          className="bg-primary text-white mt-2"
        />
      </Link>
    </div>
  );
};

export default Game;
