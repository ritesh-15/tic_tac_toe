import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../keys";

export interface IJWT extends jwt.JwtPayload {
  _id: string;
}

class JWT {
  static generate(_id: string) {
    const accessToken = jwt.sign({ _id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ _id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken: string) {
    return jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as IJWT;
  }

  static validateRefreshToken(refreshToken: string) {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as IJWT;
  }
}

export default JWT;
