import { Middleware } from "../types";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";
import { Jwt } from "../services/jwt/jwt";

export const verifyTokenSentByParams: Middleware = (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) throw new UnauthorizedErr();

    const decoded = Jwt.verify(token);
    res.locals = { ...res.locals, tokenPayload: decoded };
    next();
  } catch (error) {
    next(error);
  }
};
