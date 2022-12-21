import { Router } from "express";
import { GameController } from "../controllers";
import { authenticate, validateBody } from "../middlewares";
import { newGameSchema, updateGameSchema } from "../validation/game";

const gameRouter = Router();

gameRouter
  .route("/")
  .post([authenticate, validateBody(newGameSchema)], GameController.newGame)
  .get([authenticate], GameController.myGames);

gameRouter
  .route("/:id")
  .get([authenticate], GameController.getSingleGame)
  .patch(
    [authenticate, validateBody(updateGameSchema)],
    GameController.updateGame
  );

export default gameRouter;
