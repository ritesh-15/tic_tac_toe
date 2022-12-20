import api from "../axios";

export interface ILogin {
  username: string;
  password: string;
}

export const loginApi = async (data: ILogin) => {
  return api.post("/auth/login", data);
};
