import * as yup from "yup";

export const createAccountSchema = yup.object().shape({
  name: yup.string().required("Please enter your name!"),
  username: yup.string().required("Please enter your username!"),
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter your email!"),
  password: yup.string().required("Please enter your password!"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("Please enter your name!"),
  password: yup.string().required("Please enter your password!"),
});
