import api from "../axios";

interface INewGame {
  email: string;
}

export interface IUpdateGame {
  board?: Array<Array<string | null>>;
  isOpponentTurn?: boolean;
  isFinished?: boolean;
  winner?: string | null;
}

export const newGameApi = async (data: INewGame) => {
  return api.post("/game", data).then((res) => res.data);
};

export const gamesApi = async () => {
  return api.get("/game").then((res) => res.data);
};

export const singleGameApi = async (id: string) => {
  return api.get(`/game/${id}`).then((res) => res.data);
};

export const updaateGameApi = async (id: string, data: IUpdateGame) => {
  return api.patch(`/game/${id}`, data).then((res) => res.data);
};
