import { Register } from "../register/registerSchema";
import { db } from "../../../db/db";
import { accounts } from "../../../db/schemas";

export const verifyRegisterService = async (newAccount: Register) => {
  await db.insert(accounts).values({ ...newAccount });
};
