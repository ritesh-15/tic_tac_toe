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
  const { isFinished, isOpponentTurn } = game;

  return (
    <div className="bg-white shadow-lg py-3 px-2 rounded-md">
      <h1 className="font-bold">
        Game with{" "}
        {game.creator.id === user.id ? game.opponent.name : game.creator.name}
      </h1>
      <p className="mt-2 font-light">
        {isFinished
          ? game.winner === null || game.winner === "null"
            ? "It's Draw!"
            : game.winner.id === user.id
            ? "You won!"
            : "You lost!"
          : isOpponentTurn
          ? `${game?.creator.name} has played his move, it your time to play the move!`
          : game.creator.id === user.id
          ? `${game?.opponent.name} has played his move, it your time to play the move!`
          : "Game is started waiting to play!"}
      </p>
      <small>{moment(game.createdAt).format("DD MMMM YYYY, hh:mm  a")}</small>
      <Link to={`/game/${game.id}`}>
        <Button
          type="button"
          label="View game"
          className="bg-primary text-white mt-2"
        />
      </Link>
    </div>
  );
};

export default Game;
