import { MdKeyboardArrowLeft } from "react-icons/md";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/authenticationSchema";
import { Button, FormField } from "../../components";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { loginApi } from "../../api/auth";
import IUserRes from "../../interfaces/auth/IUserRes";
import useUser from "../../app/slices/user/useUser";
import useMessage from "../../app/slices/message/useMessage";
import { useEffect } from "react";
interface ILogin {
  password: string;
  username: string;
}

const useLogin = () => {
  const initialValues: ILogin = {
    password: "",
    username: "",
  };

  const { newMessage } = useMessage();
  const { setUserState } = useUser();

  const loginMutation = useMutation(loginApi, {
    onSuccess: (data: IUserRes) => {
      setUserState(data.user);
      newMessage("Login successfully!");
    },
    onError: (error) => {
      // @ts-ignore
      newMessage(error.response.data.message, true);
    },
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
    validationSchema: loginSchema,
  });

  return { values, handleChange, handleSubmit, errors, loginMutation };
};

const Login = () => {
  const { values, handleChange, handleSubmit, errors, loginMutation } =
    useLogin();

  return (
    <section className="min-h-screen flex flex-col justify-around pb-4">
      <div className="mt-4">
        <Link to="/">
          <MdKeyboardArrowLeft className="text-4xl cursor-pointer mb-4" />
        </Link>
        <h5 className="font-xl mb-1">Login</h5>
        <h1 className="font-bold text-3xl">Please enter your details</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="flex-1 flex-col flex justify-between mt-8"
      >
        <div className="">
          <FormField
            parentclassname="mb-6"
            placeholder="Type your username here"
            label="Username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
          />
          <FormField
            parentclassname="mb-6"
            placeholder="Type your password here"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <Button
          isLoading={loginMutation.isLoading}
          type="submit"
          label="Login"
          className="bg-primary text-white"
        />
      </form>
      <div className="mt-4 flex items-center text-sm font-light">
        <p>Dont have account yet?, let's create one</p>
        <Link
          className="ml-1 font-semibold text-primary cursor-pointer"
          to="/create-account"
        >
          Register
        </Link>
      </div>
    </section>
  );
};

export default Login;
