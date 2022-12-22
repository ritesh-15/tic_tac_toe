import http from "http";
import { Server } from "socket.io";
import { corsOptions, logger } from "./config";
import GameService from "./services/Game.service";

const socketConnection = (httpServer: http.Server) => {
  const io = new Server(httpServer, { cors: corsOptions });
  io.on("connection", (socket) => {
    socket.on("join_game", (gameId: string) => {
      socket.join(gameId);

      // updated game board
      socket.on(
        "game_board_updated",
        async ({ gameId, board, isOpponentTurn }) => {
          try {
            // store the game board in the database
            await GameService.updateGame(gameId, { board, isOpponentTurn });
            // emit the updated boarad to another user
            socket.to(gameId).emit("game_board_updated", board);
          } catch (err) {
            logger.error(err);
          }
        }
      );

      // listen for game win event
      socket.on("game_win", (game) => {
        socket.to(gameId).emit("game_win", game);
      });

      // leave the game
      socket.on("leave_game", () => {
        socket.leave(gameId);
        socket.to(gameId).emit("user_left_game", socket.id);
      });
    });
  });
};

export default socketConnection;
