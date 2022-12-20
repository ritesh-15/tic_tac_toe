import express, { Application } from "express";
import { connection, initServer, logger } from "./config";
import { PORT } from "./keys";

const app: Application = express();

app.listen(PORT, async () => {
  initServer(app);
  await connection();
  logger.info(`Server listening on port ${PORT}...`);
});
