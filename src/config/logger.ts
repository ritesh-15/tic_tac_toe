import winston, { createLogger, format } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(timestamp(), myFormat),
  transports: [new winston.transports.Console()],
});

export default logger;
