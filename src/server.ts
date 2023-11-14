import express, { Application } from "express"
import { connection, initServer, logger } from "./config"
import { PORT, HOSTNAME } from "./keys"
import socketConnection from "./socket"
import { Server } from "http"

const app: Application = express()
const httpServer = new Server(app)
initServer(app)

httpServer.listen(PORT, HOSTNAME, undefined, async () => {
  await connection()
  logger.info(`Server listening on port ${PORT}...`)
})

socketConnection(httpServer)
