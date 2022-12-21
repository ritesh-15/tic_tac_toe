import Button from "../button/Button";
import { Link } from "react-router-dom";
import { FC } from "react";
import { IGame } from "../../interfaces/game/IGame";
import useUser from "../../app/slices/user/useUser";
import moment from "moment";

interface IProps {
  game: IGame;
}

const Game: FC<IProps> = ({ game }) => {
  const { user } = useUser();

  return (
    <div className="bg-white shadow-lg py-3 px-2 rounded-md">
      <h1 className="font-bold">
        Game with{" "}
        {game.creator.id === user.id ? game.opponent.name : game.creator.name}
      </h1>
      <p className="mt-2 font-light">
        Tanmay just made their move! It’s your turn to play now.
      </p>
      <small>{moment(game.createdAt).format("DD MMMM YYYY, hh:mm  a")}</small>
      <Link to={`/game/${game.id}`}>
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
