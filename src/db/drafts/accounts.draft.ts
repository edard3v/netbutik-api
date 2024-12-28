process.loadEnvFile();
import { Bcrypt } from "../../services/bcrypt/bcrypt";
import { Role } from "../schemas";

export const ACCOUNTS = [
  {
    id: "a0000000-1111-2222-3333-44444444444",
    email: process.env.ADMIN_EMAIL!,
    password: Bcrypt.hash(process.env.ADMIN_PASSWORD!),
    role: Role.admin,
  },
  {
    id: "a1000000-1111-2222-3333-44444444444",
    email: "lore@gmail.com",
    password: Bcrypt.hash("123456"),
  },

  {
    id: "a2000000-1111-2222-3333-44444444444",
    email: "myke@gmail.com",
    password: Bcrypt.hash("123456"),
  },
];
