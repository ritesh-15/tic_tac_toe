import Prisma from "../utils/Prisma";

export interface INewGame {
  creatorId: string;
  opponentId: string;
  board: Array<Array<string | null>>;
}

export interface IUpdateGame {
  board?: Array<Array<string | null>>;
  isOpponentTurn?: boolean;
  isFinished?: boolean;
  winnerId?: string;
}

class GameService {
  static create({ creatorId, opponentId, board }: INewGame) {
    return Prisma.client.game.create({
      data: {
        creatorId,
        opponentId,
        board,
        winnerId: null,
      },
      select: {
        creator: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        opponent: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        winner: {
          select: { id: true, email: true, name: true },
        },
        board: true,
        isFinished: true,
        createdAt: true,
        id: true,
        isOpponentTurn: true,
      },
    });
  }

  static updateGame(id: string, data: IUpdateGame) {
    return Prisma.client.game.update({
      where: { id },
      data: {
        winnerId: data.winnerId,
        board: data.board,
        isFinished: data.isFinished,
        isOpponentTurn: data.isOpponentTurn,
      },
      select: {
        creator: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        opponent: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        winner: {
          select: { id: true, email: true, name: true },
        },
        board: true,
        isFinished: true,
        createdAt: true,
        id: true,
        isOpponentTurn: true,
      },
    });
  }

  static findGameByCreatorAndOpponent(creatorId: string, opponentId: string) {
    return Prisma.client.game.findFirst({
      where: {
        AND: [
          {
            OR: [{ creatorId: creatorId }, { opponentId: opponentId }],
          },
          {
            OR: [{ creatorId: opponentId }, { opponentId: creatorId }],
          },
          {
            isFinished: false,
          },
        ],
      },
    });
  }

  static findByID(id: string) {
    return Prisma.client.game.findUnique({
      where: {
        id,
      },
      select: {
        creator: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        opponent: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        winner: {
          select: { id: true, email: true, name: true },
        },
        board: true,
        isFinished: true,
        createdAt: true,
        id: true,
        isOpponentTurn: true,
      },
    });
  }

  static getAllGames(userId: string) {
    return Prisma.client.game.findMany({
      where: {
        OR: [{ creatorId: userId }, { opponentId: userId }],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        creator: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        opponent: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        winner: {
          select: { id: true, email: true },
        },
        board: true,
        isFinished: true,
        createdAt: true,
        id: true,
        isOpponentTurn: true,
      },
    });
  }
}

export default GameService;
