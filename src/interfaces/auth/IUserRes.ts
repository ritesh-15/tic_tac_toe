import IResponse from "../IResponse";
import IUser from "../IUser";

export default interface IUserRes extends IResponse {
  user: IUser;
}
