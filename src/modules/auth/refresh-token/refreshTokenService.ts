import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../../../services/jwt/jwt";

export const refreshTokenService = (token: string) => {
  const tokenPayload = jwt.decode(token) as JwtPayload;

  const newPayload = { ...tokenPayload };
  if (newPayload.iat) delete newPayload.iat;
  if (newPayload.exp) delete newPayload.exp;

  const newToken = jwt.sign(newPayload, JWT.secret as string, {
    expiresIn: JWT.expiresIn,
  });

  return newToken;
};
