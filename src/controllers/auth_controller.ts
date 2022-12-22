import { NextFunction, Request, Response } from "express";
import { cookieOption, logger } from "../config";
import UserService from "../services/user.service";
import HttpError from "../utils/HttpError";
import bcrypt from "bcrypt";
import JWT, { IJWT } from "../utils/jwt";
import TokenService from "../services/Token.service";
import UserDto from "../dtos/UserDto";

class AuthController {
  /**
   * @route /auth/login
   * @desc login to a account
   * @access public
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      // find ther user with email address
      const user = await UserService.findByEmailOrUserName({ username });

      // if not user found
      if (!user)
        return next(
          HttpError.forbidden("Invalid username or password, please try again.")
        );

      // validate the password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return next(
          HttpError.forbidden("Invalid username or password, please try again.")
        );

      // generate the tokens
      const { accessToken, refreshToken } = JWT.generate(user.id);

      // store the tokens
      await TokenService.createToken({
        userId: user.id,
        token: refreshToken,
      });

      // generate cookies
      res.cookie("access_token", accessToken, cookieOption);

      res.cookie("refresh_token", refreshToken, cookieOption);

      return res.status(200).json({
        ok: true,
        user: new UserDto(user),
        message: "Logged in successfully!",
      });
    } catch (err) {
      // @ts-ignore
      logger.error(err);
      return next(HttpError.internalServerError());
    }
  }

  /**
   * @route /auth/create-account
   * @desc create a new account
   * @access public
   */
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username, name } = req.body;

      // find ther user in the database
      const foundUser = await UserService.findByEmailOrUserName({
        email,
        username,
      });

      if (foundUser)
        return next(
          HttpError.forbidden("User already exits with email or username!")
        );

      // hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // create a new user
      const user = await UserService.createUser({
        email,
        password: hashPassword,
        name,
        username,
      });

      // generate the tokens
      const { accessToken, refreshToken } = JWT.generate(user.id);

      // store the tokens
      await TokenService.createToken({
        userId: user.id,
        token: refreshToken,
      });

      // generate cookies
      res.cookie("access_token", accessToken, cookieOption);

      res.cookie("refresh_token", refreshToken, cookieOption);

      return res.json({
        ok: true,
        user: new UserDto(user),
        message: "Account created successfully!",
      });
    } catch (err) {
      logger.error(err);
      return next(HttpError.internalServerError());
    }
  }

  /**
   * @route /auth/refresh
   * @desc refresh the tokens
   * @access public
   */
  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      // get the refresh token and access token
      let { refresh_token } = req.cookies;

      if (!refresh_token)
        return next(HttpError.unauthorized("Jwt token not found"));

      let payload: IJWT | null = null;
      // validate the refresh token
      try {
        payload = JWT.validateRefreshToken(refresh_token);
      } catch (err) {
        // @ts-ignore
        return next(
          HttpError.unauthorized(
            "Your session is expired please login again to continue"
          )
        );
      }

      // check for the reuse token
      const session = await TokenService.findToken(payload._id, refresh_token);

      if (!session) {
        // if not found the token expires all the tokens
        await TokenService.deleteAll(payload._id);

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        return next(
          HttpError.unauthorized(
            "Your session is expired please login again to continue"
          )
        );
      }

      // find the user
      const user = await UserService.findByID(session.userId);

      if (!user) return next(HttpError.notFound("User not found!"));

      // delete the old session
      await TokenService.deleteByID(session.id);

      // generate the tokens
      const { accessToken, refreshToken } = JWT.generate(user.id);

      // store the tokens
      await TokenService.createToken({
        userId: user.id,
        token: refreshToken,
      });

      // generate cookies
      res.cookie("access_token", accessToken, cookieOption);

      res.cookie("refresh_token", refreshToken, cookieOption);

      return res.status(200).json({
        ok: true,
        message: "Refreshed successfully!",
      });
    } catch (err) {
      // @ts-ignore
      logger.error(err);
      return next(HttpError.internalServerError());
    }
  }

  /**
   * @route /auth/me
   * @desc get logged in user details
   * @access private
   */
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        ok: true,
        message: "Feteched successfully!",
        user: req.user,
      });
    } catch (err) {
      // @ts-ignore
      logger.error(err);
      return next(HttpError.internalServerError());
    }
  }

  /**
   * @route /auth/lgout
   * @desc log out user
   * @access private
   */
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      // lot out from all the sessions
      await TokenService.deleteAll(user.id);

      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      return res.json({
        ok: true,
        message: "Logged out successfully!",
      });
    } catch (err) {
      // @ts-ignore
      logger.error(err);
      return next(HttpError.internalServerError());
    }
  }
}

export default AuthController;
