import { User } from "@prisma/client";

class UserDto {
  name: string;
  username: string;
  email: string;
  isInGame: boolean;
  id: string;

  constructor(user: User) {
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.isInGame = user.isInGame;
    this.id = user.id;
  }
}

export default UserDto;
