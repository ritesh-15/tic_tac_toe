import api from "../axios";

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister extends ILogin {
  email: string;
  name: string;
}

export const loginApi = async (data: ILogin) => {
  return api.post("/auth/login", data).then((res) => res.data);
};

export const registerApi = async (data: IRegister) => {
  return api.post("/auth/create-account", data).then((res) => res.data);
};

export const logoutApi = async () => {
  return api.delete("/auth/logout").then((res) => res.data);
};

export const infoApi = async () => {
  return api.get("/auth/me").then((res) => res.data);
};
