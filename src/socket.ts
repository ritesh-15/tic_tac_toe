import http from "http";
import { Server } from "socket.io";
import { corsOptions } from "./config";

const socketConnection = (httpServer: http.Server) => {
  const io = new Server(httpServer, { cors: corsOptions });
  io.on("connection", (socket) => {
    socket.on("join_game", (gameId: string) => {
      socket.join(gameId);

      // updated game board
      socket.on("game_board_updated", (board) => {
        // emit the updated boarad to another user
        socket.to(gameId).emit("game_board_updated", board);
      });

      // listen for game win event
      socket.on("game_win", (game) => {
        socket.to(gameId).emit("game_win", game);
      });
    });
  });
};

export default socketConnection;
