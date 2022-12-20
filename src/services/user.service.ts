import Prisma from "../utils/Prisma";
import { IRegister } from "../validation";

class UserService {
  static findByEmailOrUserName({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }) {
    return Prisma.client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  static findByID(id: string) {
    return Prisma.client.user.findUnique({
      where: {
        id,
      },
    });
  }

  static createUser({ email, username, password, name }: IRegister) {
    return Prisma.client.user.create({
      data: {
        email,
        username,
        password,
        name,
      },
    });
  }
}

export default UserService;
