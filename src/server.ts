import express, { Application } from "express";
import { connection, initServer, logger } from "./config";
import { PORT } from "./keys";
import socketConnection from "./socket";

const app: Application = express();
initServer(app);

const server = app.listen(PORT, async () => {
  await connection();
  logger.info(`Server listening on port ${PORT}...`);
});

socketConnection(server);
