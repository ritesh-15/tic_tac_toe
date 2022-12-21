import express, { Application } from "express";
import { connection, initServer, logger } from "./config";
import { PORT } from "./keys";
import socketConnection from "./socket";
import http from "http";

const app: Application = express();
initServer(app);

const server = http.createServer(app);
socketConnection(server);

server.listen(PORT, async () => {
  await connection();
  logger.info(`Server listening on port ${PORT}...`);
});
