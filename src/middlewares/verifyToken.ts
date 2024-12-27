import jwt, { JwtPayload } from "jsonwebtoken";
import { Next, Req, Res } from "../types";
import { JWT } from "../config/jwt";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";
import { Role } from "../db/schemas";

export const verifyToken = (role?: Role) => {
  return (req: Req, res: Res, next: Next) => {
    const token = req.headers.authorization;
    if (!token) throw new UnauthorizedErr();

    try {
      jwt.verify(token, JWT.secret as string, (err, decoded) => {
        if (err) throw new UnauthorizedErr(401);

        const tokenPayload = decoded as JwtPayload;
        if (role && tokenPayload?.role !== role) throw new UnauthorizedErr(403);

        res.locals = { ...res.locals, tokenPayload };
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};
