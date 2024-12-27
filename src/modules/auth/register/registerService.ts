import { sendMailToVerifyRegisterService } from "./sendMailToVerifyRegisterService";
import { Register } from "./registerSchema";
import { db } from "../../../db/db";
import { DtoErr } from "../../../errors/DtoErr";
import { Bcrypt } from "../../../services/bcrypt/bcrypt";
import { Jwt } from "../../../services/jwt/jwt";

export const registerService = async (register: Register) => {
  await checkEmail(register.email);

  const newRegister = { ...register };
  const passHashed = Bcrypt.hash(newRegister.password);
  newRegister.password = passHashed;

  const token = Jwt.sign(newRegister, {
    expiresIn: Jwt.expiresInRegister,
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
