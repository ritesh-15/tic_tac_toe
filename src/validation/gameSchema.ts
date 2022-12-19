import * as yup from "yup";

export const newGameSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter your email!"),
});
