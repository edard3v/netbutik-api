process.loadEnvFile();
import bcrypt from "bcrypt";
import { accounts, Role } from "./schemas";
import { BCRYPT } from "../bcrypt/bcrypt";
import { db } from "./db";

const EDAR = {
  id: crypto.randomUUID(),
  email: process.env.ADMIN_EMAIL!,
  password: process.env.ADMIN_PASSWORD!,
  role: Role.admin,
};

const LORE = {
  id: crypto.randomUUID(),
  email: "lore@gmail.com",
  password: "123456",
};

const MYKE = {
  id: crypto.randomUUID(),
  email: "myke@gmail.com",
  password: "123456",
};

const seed = async () => {
  EDAR.password = await bcrypt.hash(EDAR.password, BCRYPT.salt);
  LORE.password = await bcrypt.hash(LORE.password, BCRYPT.salt);
  MYKE.password = await bcrypt.hash(MYKE.password, BCRYPT.salt);

  await db.delete(accounts).execute();
  await db.insert(accounts).values([EDAR, LORE, MYKE]);
};

seed().catch(console.error);
