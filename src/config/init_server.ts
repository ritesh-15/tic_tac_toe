import { Application, json, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import HttpError from "../utils/HttpError";
import { errorHandler } from "../middlewares";
import { corsOptions } from "./cors_config";
import { apiLimiter, authRateLimiter } from "./rate_limit";
import morgan from "morgan";
import helmet from "helmet";
import { authRouter } from "../routes";

export const initServer = (app: Application) => {
  // middlewares
  app.use(json({ limit: "10mb" }));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morgan("dev"));

  app.use("/api", apiLimiter);

  // routes
  app.use("/api/auth", authRateLimiter, authRouter);

  // handle the unplemented route
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(
      HttpError.notImplemented("The route your looking for is not implemented!")
    );
  });

  // error handler
  app.use(errorHandler);
};
