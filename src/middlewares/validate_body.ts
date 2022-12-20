import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/HttpError";
import z from "zod";

const validateBody = (schema: Zod.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const parsed = await schema.safeParseAsync(req.body);
    if (parsed.success) {
      req.body = parsed.data;
      next();
      return;
    }
    next(HttpError.unprocessableEntity(parsed.error.errors[0].message));
  };
};

export default validateBody;
