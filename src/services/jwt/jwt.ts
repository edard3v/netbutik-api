import jwt, { SignOptions } from "jsonwebtoken";
import { UnauthorizedErr } from "../../errors/UnauthorizedErr";

export class Jwt {
  static secret = process.env.SECRET_JWT;
  static expiresIn = "1w";
  static expiresInRegister = "30m";

  static verify(token: string) {
    if (!this.secret) throw new TypeError("No hay secret");

    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new UnauthorizedErr(401);
    }
  }

  static sign(payload: object, options?: SignOptions) {
    if (!this.secret) throw new TypeError("No hay secret");

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      ...options,
    });
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}

//  1s segundos
//  1m minutos
//  1h horas
//  1d días
//  1w semanas
//  1M meses
//  1y años
