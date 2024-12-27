import { JwtPayload } from "jsonwebtoken";
import { Jwt } from "../../../services/jwt/jwt";

export const refreshTokenService = (token: string) => {
  const { iat, exp, ...rest } = Jwt.decode(token) as JwtPayload;

  const newToken = Jwt.sign({ ...rest });

  return newToken;
};
