import jwt from "jsonwebtoken";
import { Middleware } from "../types";
import { JWT } from "../config/jwt";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";

export const verifyTokenSentByParams: Middleware = (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) throw new UnauthorizedErr();

    jwt.verify(token, JWT.secret as string, (err, tokenPayload) => {
      if (err) throw new UnauthorizedErr(401);
      res.locals = { ...res.locals, tokenPayload };
      next();
    });
  } catch (error) {
    next(error);
  }
};
