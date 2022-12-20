import UserDto from "../dtos/UserDto";

export {};

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}
