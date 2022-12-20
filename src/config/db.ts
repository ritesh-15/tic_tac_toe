import Prisma from "../utils/Prisma";
import logger from "./logger";

export const connection = async () => {
  try {
    await Prisma.client.$connect();
    logger.info("Connected to the database!!");
  } catch (err) {
    // @ts-ignore
    await Prisma.client.$disconnect();
    logger.error(err);
  }
};
