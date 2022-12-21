import { Router } from "express";
import { AuthController } from "../controllers";
import { authenticate, validateBody } from "../middlewares";
import { loginSchema, registerSchema } from "../validation";

const authRouter = Router();

authRouter
  .route("/login")
  .post([validateBody(loginSchema)], AuthController.login);

authRouter
  .route("/create-account")
  .post([validateBody(registerSchema)], AuthController.register);

authRouter.route("/refresh").get(AuthController.refresh);

authRouter.route("/me").get([authenticate], AuthController.me);

authRouter.route("/logout").delete([authenticate], AuthController.logout);

export default authRouter;
