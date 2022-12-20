import z from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required!" }).trim(),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, "Password must be greater than 6 characters!")
    .trim(),
});

export type ILogin = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email address is required!" })
    .email("Invalid email address!"),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, "Password must be greater than 6 characters!")
    .trim(),
  username: z
    .string({ required_error: "Username is required!" })
    .min(5, "Username be greater than 5 characters!")
    .trim(),
  name: z
    .string({ required_error: "Name is required!" })
    .min(5, "Name be greater than 5 characters!")
    .trim(),
});

export type IRegister = z.infer<typeof registerSchema>;
