import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button, FormField } from "../../components";
import { useFormik } from "formik";
import { newGameSchema } from "../../validation/gameSchema";
import { useMutation, useQueryClient } from "react-query";
import { newGameApi } from "../../api/game";
import useMessage from "../../app/slices/message/useMessage";

interface INewGame {
  email: string;
}

const useNewGame = () => {
  const initialValues: INewGame = {
    email: "",
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { newMessage } = useMessage();

  const newGameMutation = useMutation(newGameApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("games");
      newMessage("New game created successfully!");
      navigate("/home");
    },
    onError: (err) => {
      // @ts-ignore
      newMessage(err.response.data.message, true);
    },
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      newGameMutation.mutate(values);
    },
    validationSchema: newGameSchema,
  });

  return { values, handleChange, handleSubmit, errors, newGameMutation };
};

const NewGame = () => {
  const { values, handleChange, handleSubmit, errors, newGameMutation } =
    useNewGame();

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
          disabled={newGameMutation.isLoading}
          type="submit"
          label="Start game"
          className="bg-primary text-white"
        />
      </form>
    </section>
  );
};

export default NewGame;
