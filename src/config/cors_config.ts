import { CorsOptions } from "cors";
import { CLIENT_URL } from "../keys";

export const corsOptions: CorsOptions = {
  origin: [CLIENT_URL],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};
