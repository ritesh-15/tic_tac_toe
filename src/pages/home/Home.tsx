import { Button, Game, GameNotFound } from "../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="h-screen pb-4 flex flex-col relative">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Your Games</h1>
      </div>
      {/* <GameNotFound /> */}
      <div className="flex flex-col gap-6 mt-4 overflow-y-auto">
        <Game />
        <Game />
        <Game />
        <Game />
      </div>

      <div className="absolute right-0 bottom-4">
        <Link to="/new-game">
          <Button
            icon={<AiOutlinePlus className="text-xl" />}
            label="New Game"
            className="bg-btnBg text-white"
          />
        </Link>
      </div>
    </section>
  );
};

export default Home;
