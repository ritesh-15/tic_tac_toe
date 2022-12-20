import { PrismaClient } from "@prisma/client";

class Prisma {
  static readonly client: PrismaClient = new PrismaClient();
}

export default Prisma;
