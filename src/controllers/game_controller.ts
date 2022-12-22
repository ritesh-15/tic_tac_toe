import { NextFunction, Request, Response } from "express";
import { logger } from "../config";
import GameService from "../services/Game.service";
import UserService from "../services/user.service";
import HttpError from "../utils/HttpError";

class GameController {
  static async myGames(req: Request, res: Response, next: NextFunction) {
    try {
      const games = await GameService.getAllGames(req.user.id);
      return res.status(200).json({ ok: true, games });
    } catch (error) {
      // @ts-ignore
      logger.log(error);
      return next(HttpError.internalServerError());
    }
  }

  static async newGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      // check if email is same as current user email
      if (email == req.user.email) {
        return next(
          HttpError.badRequest(
            "You have entered you email address please enter opponent email address!"
          )
        );
      }

      // find ther user by email
      const opponent = await UserService.findByEmailOrUserName({ email });

      if (!opponent) {
        return next(
          HttpError.notFound("User not found with given email address!")
        );
      }

      // check if already games is going on with same opponent
      const gameGoingOn = await GameService.findGameByCreatorAndOpponent(
        req.user.id,
        opponent.id
      );

      if (gameGoingOn) {
        return next(
          HttpError.badRequest(
            "You have already in game with the oppoenent please finish that game first!"
          )
        );
      }

      // create a new game
      const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];

      console.log(req.body);

      const game = await GameService.create({
        creatorId: req.user.id,
        opponentId: opponent.id,
        board,
      });

      return res.status(201).json({
        ok: true,
        message: "New game created successfully",
        game,
      });
    } catch (error) {
      // @ts-ignore
      logger.error(error.message);
      return next(HttpError.internalServerError());
    }
  }

  static async getSingleGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) return next(HttpError.badRequest("Game id not specified!"));

      const game = await GameService.findByID(id);

      if (!game) return next(HttpError.badRequest("Game not found"));

      return res.status(200).json({
        ok: true,
        game,
      });
    } catch (err) {
      // @ts-ignore
      logger.error(err.message);
      return next(HttpError.internalServerError());
    }
  }

  static async updateGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { isOpponentTurn, isFinished, winner, board } = req.body;

      if (!id) return next(HttpError.badRequest("Game id is not specified!"));

      const game = await GameService.findByID(id);

      if (!game) return next(HttpError.badRequest("Game not found"));

      const updatedGame = await GameService.updateGame(id, {
        isOpponentTurn,
        isFinished,
        board,
        winnerId: winner,
      });

      return res.status(200).json({ ok: true, game: updatedGame });
    } catch (err) {
      // @ts-ignore
      logger.error(err.message);
      return next(HttpError.internalServerError());
    }
  }
}

export default GameController;
