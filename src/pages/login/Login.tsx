import { MdKeyboardArrowLeft } from "react-icons/md";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/authenticationSchema";
import { Button, FormField } from "../../components";
import { Link } from "react-router-dom";

interface ILogin {
  password: string;
  username: string;
}

const useLogin = () => {
  const initialValues: ILogin = {
    password: "",
    username: "",
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      // TODO handle login logic
    },
    validationSchema: loginSchema,
  });

  return { values, handleChange, handleSubmit, errors };
};

const Login = () => {
  const { values, handleChange, handleSubmit, errors } = useLogin();

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
        <Button type="submit" label="Login" className="bg-primary text-white" />
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
