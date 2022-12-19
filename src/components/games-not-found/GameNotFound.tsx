import { FC } from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";

const GameNotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <p className="text-5xl text-center font-bilbo max-w-[75%]">
        No Games Found
      </p>
      <Link to="/new-game" className="w-full">
        <Button
          type="submit"
          label="Start a new game"
          className="bg-primary text-white mt-12"
        />
      </Link>
    </div>
  );
};

export default GameNotFound;
