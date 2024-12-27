import jwt from "jsonwebtoken";
import { sendMailToVerifyRegisterService } from "./sendMailToVerifyRegisterService";
import { Register } from "./registerSchema";
import { db } from "../../../db/db";
import bcrypt from "bcrypt";
import { BCRYPT } from "../../../config/bcrypt";
import { JWT } from "../../../config/jwt";
import { DtoErr } from "../../../errors/DtoErr";

export const registerService = async (register: Register) => {
  await checkEmail(register.email);

  const newRegister = { ...register };
  const passHashed = await bcrypt.hash(newRegister.password, BCRYPT.salt);
  newRegister.password = passHashed;

  const token = jwt.sign(newRegister, JWT.secret as string, {
    expiresIn: JWT.expiresInSignup,
  });

  const link = `${process.env.API_BASE_URL}/auth/verify-register/${token}`;
  await sendMailToVerifyRegisterService(newRegister.email, link);
};

const checkEmail = async (email: string) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.email, email),
  });
  if (account) throw new DtoErr({ msg: "Email no disponible" });
};
