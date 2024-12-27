import { Next, Req, Res } from "../types";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";
import { Role } from "../db/schemas";
import { Jwt } from "../services/jwt/jwt";
import { JwtPayload } from "jsonwebtoken";

export const verifyToken = (role?: Role) => {
  return (req: Req, res: Res, next: Next) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ").at(1);

    if (!token) throw new UnauthorizedErr();

    try {
      const decoded = Jwt.verify(token) as JwtPayload;

      if (role && decoded?.role !== role) throw new UnauthorizedErr(403);

      res.locals = { ...res.locals, tokenPayload: decoded };

      next();
    } catch (error) {
      next(error);
    }
  };
};
