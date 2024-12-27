import { Login } from "./loginSchema";
import { db } from "../../../db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT } from "../../../services/jwt/jwt";
import { UUID } from "crypto";
import { Role } from "../../../db/schemas";
import { LoginErr } from "../../../errors/LoginErr";

export const loginService = async (login: Login) => {
  const account = await db.query.accounts.findFirst({
    where: (account, { eq }) => eq(account.email, login.email),
  });
  if (!account) throw new LoginErr();

  const isLogged = await bcrypt.compare(login.password, account.password);
  if (!isLogged) throw new LoginErr();

  const token = jwt.sign(
    {
      id: account.id,
      role: account.role,
      img: account.img,
      name: account.name,
      email: account.email,
    },
    JWT.secret as string,
    { expiresIn: JWT.expiresIn }
  );

  return token;
};

export type TokenPayload = {
  id: UUID;
  role: Role;
  name: string;
  img: string;
  email: string;
};
