import Prisma from "../utils/Prisma";

class TokenService {
  static createToken({ userId, token }: { userId: string; token: string }) {
    return Prisma.client.token.create({
      data: {
        userId,
        token,
      },
    });
  }

  static findToken(userId: string, token: string) {
    return Prisma.client.token.findFirst({
      where: {
        AND: [{ userId, token }],
      },
    });
  }

  static deleteAll(userId: string) {
    return Prisma.client.token.deleteMany({
      where: {
        userId,
      },
    });
  }

  static deleteByID(id: string) {
    return Prisma.client.token.delete({
      where: {
        id,
      },
    });
  }
}

export default TokenService;
