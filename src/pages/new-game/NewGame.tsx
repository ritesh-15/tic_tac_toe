import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button, FormField } from "../../components";
import { useFormik } from "formik";
import { newGameSchema } from "../../validation/gameSchema";

interface INewGame {
  email: string;
}

const useNewGame = () => {
  const initialValues: INewGame = {
    email: "",
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      // TODO handle new game logic
    },
    validationSchema: newGameSchema,
  });

  return { values, handleChange, handleSubmit, errors };
};

const NewGame = () => {
  const { values, handleChange, handleSubmit, errors } = useNewGame();

  return (
    <section className="min-h-screen flex flex-col justify-around pb-4">
      <div className="mt-4">
        <Link to="/home">
          <MdKeyboardArrowLeft className="text-4xl cursor-pointer mb-4" />
        </Link>
        <h5 className="font-xl mb-1">Start a new game</h5>
        <h1 className="font-bold text-3xl">Whom do you want to play with?</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex-1 flex-col flex justify-between mt-8"
      >
        <FormField
          parentclassname="mb-6"
          placeholder="Type your email here"
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Button
          type="submit"
          label="Start game"
          className="bg-primary text-white"
        />
      </form>
    </section>
  );
};

export default NewGame;
