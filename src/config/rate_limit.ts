import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import HttpError from "../utils/HttpError";

const apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {
    return next(
      HttpError.toManyRequest(
        "Too many from this IP, please try again after 15 mininutes"
      )
    );
  },
});

const authRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {
    return next(
      HttpError.toManyRequest(
        "Too many from this IP, please try again after 30 mininutes"
      )
    );
  },
});

export { apiLimiter, authRateLimiter };
