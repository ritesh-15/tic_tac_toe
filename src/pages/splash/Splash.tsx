import { Button } from "../../components";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <section className="min-h-screen py-4 flex flex-col justify-around">
      <div className="">
        <h1 className="text-3xl font-bilbo text-center">async</h1>
        <p className="text-8xl max-w-[75%] mx-auto font-bilbo font-semibold text-center mt-4">
          tic tac toe
        </p>
      </div>
      <div className="">
        <Link to="/login">
          <Button
            type="button"
            label="Login"
            className="bg-primary text-white"
          />
        </Link>

        <Link to="/create-account">
          <Button
            type="button"
            label="Register"
            className="bg-secondary text-white mt-4"
          />
        </Link>
      </div>
    </section>
  );
};

export default Splash;
