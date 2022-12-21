export interface IGame {
  creator: Creator;
  opponent: Opponent;
  winner: any;
  turn: Turn;
  board: Array<Array<string | null>>;
  isFinished: boolean;
  createdAt: string;
  id: string;
}

export interface Creator {
  name: string;
  email: string;
  id: string;
}

export interface Opponent {
  name: string;
  email: string;
  id: string;
}

export interface Turn {
  id: string;
  email: string;
}
