import { CookieOptions } from "express";

const cookieOption: CookieOptions = {
  maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export default cookieOption;
