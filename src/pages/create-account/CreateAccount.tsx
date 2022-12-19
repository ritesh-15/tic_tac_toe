import { useFormik } from "formik";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button, FormField } from "../../components";
import { createAccountSchema } from "../../validation/authenticationSchema";
import { Link } from "react-router-dom";

interface ICreateAccount {
  name: string;
  email: string;
  password: string;
  username: string;
}

export const useCreateAccount = () => {
  const initialValues: ICreateAccount = {
    name: "",
    email: "",
    password: "",
    username: "",
  };
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      // TODO handle create account logic
    },
    validationSchema: createAccountSchema,
  });

  return { values, handleChange, handleSubmit, errors };
};

const CreateAccount = () => {
  const { values, handleChange, handleSubmit, errors } = useCreateAccount();

  return (
    <section className="min-h-screen flex flex-col justify-around pb-4">
      <div className="mt-4">
        <Link to="/">
          <MdKeyboardArrowLeft className="text-4xl cursor-pointer mb-4" />
        </Link>
        <h5 className="font-xl mb-1">Create account</h5>
        <h1 className="font-bold text-3xl">Let’s get to know you better!</h1>
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit} action="">
          <FormField
            parentclassname="mb-6"
            placeholder="Type your name here"
            label="Your name"
            type="text"
            value={values.name}
            onChange={handleChange}
            name="name"
            error={errors.name}
          />
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
            placeholder="Type your email here"
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
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
          <Button
            type="submit"
            label="Register"
            className="bg-primary text-white"
          />
        </form>
        <div className="mt-4 flex items-center text-sm font-light">
          <p>Already have account ?</p>
          <Link
            className="ml-1 font-semibold text-primary cursor-pointer"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
