process.loadEnvFile();
import { accounts, Role } from "./schemas";
import { db } from "./db";
import { Bcrypt } from "../services/bcrypt/bcrypt";

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
  EDAR.password = Bcrypt.hash(EDAR.password);
  LORE.password = Bcrypt.hash(LORE.password);
  MYKE.password = Bcrypt.hash(MYKE.password);

  await db.delete(accounts).execute();
  await db.insert(accounts).values([EDAR, LORE, MYKE]);
};

seed().catch(console.error);
