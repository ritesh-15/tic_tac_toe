import { NextFunction, Request, Response } from "express";
import { logger } from "../config";
import UserDto from "../dtos/UserDto";
import UserService from "../services/user.service";
import HttpError from "../utils/HttpError";
import JWT from "../utils/jwt";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the access token
  const { access_token } = req.cookies;

  try {
    if (!access_token) throw new Error();

    // validate the access token
    const payload = JWT.validateAccessToken(access_token);

    if (!payload) throw new Error();

    // find the user
    const user = await UserService.findByID(payload._id);

    if (!user) throw new Error();

    req.user = new UserDto(user);

    return next();
  } catch (err) {
    // @ts-ignore
    logger.error(err);
    return next(
      HttpError.unauthorized("You are not authorized to access this resource")
    );
  }
};

export default authenticate;
