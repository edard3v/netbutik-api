// process.loadEnvFile(".env");
import "../../services/dotenv/loadEnvFile";
import { Bcrypt } from "../../services/bcrypt/bcrypt";
import { Role } from "../schemas";

export const ACCOUNTS = [
  {
    id: "a1000000-0000-0000-0000-000000000000",
    email: process.env.ADMIN_EMAIL!,
    password: Bcrypt.hash(process.env.ADMIN_PASSWORD!),
    role: Role.admin,
  },
  {
    id: "a2000000-0000-0000-0000-000000000000",
    email: "lore@gmail.com",
    password: Bcrypt.hash("123456"),
  },
];
