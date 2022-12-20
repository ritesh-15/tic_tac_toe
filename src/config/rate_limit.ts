import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {},
});

const authRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message:
    "Too many accounts created from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {},
});

export { apiLimiter, authRateLimiter };
