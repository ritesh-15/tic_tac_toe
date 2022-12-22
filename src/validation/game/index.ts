import { z } from "zod";

export const newGameSchema = z.object({
  email: z
    .string({ required_error: "Opponent email address is require!" })
    .email("Please enter valid email address")
    .trim(),
});

export const updateGameSchema = z.object({
  isOpponentTurn: z.boolean().optional(),
  isFinished: z.boolean().optional(),
  winner: z.string().nullable().optional(),
  board: z.array(z.array(z.string().nullable())).optional(),
});
