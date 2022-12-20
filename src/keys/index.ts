import { config } from "dotenv";
config();

export const PORT: string = process.env.PORT!!;

export const CLIENT_URL: string = process.env.CLIENT_URL!!;

export const MONGO_URL: string = process.env.MONGO_URL!!;

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!!;

export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET!!;
