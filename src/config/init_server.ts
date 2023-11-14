import { Application, json, NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import HttpError from "../utils/HttpError"
import { errorHandler } from "../middlewares"
import { corsOptions } from "./cors_config"
import { apiLimiter } from "./rate_limit"
import morgan from "morgan"
import helmet from "helmet"
import { authRouter, gameRouter } from "../routes"

export const initServer = (app: Application) => {
  // middlewares
  app.use(json({ limit: "100mb" }))
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(helmet())
  app.use(morgan("dev"))

  app.get("/health", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      ok: true,
      message: "ok this is updated message from health check route 🚀🚀",
    })
  })

  // routes
  app.use("/api/auth", authRouter)
  app.use("/api/game", apiLimiter, gameRouter)

  // handle the unplemented route
  app.use((req: Request, res: Response, next: NextFunction) => {
    return next(
      HttpError.notImplemented("The route your looking for is not implemented!")
    )
  })

  // error handler
  app.use(errorHandler)
}
