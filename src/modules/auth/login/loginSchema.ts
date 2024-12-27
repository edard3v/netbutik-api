import z from "zod";
import { emailSchema } from "../../../zod-schemas/emailSchema";
import { passwordSchema } from "../../../zod-schemas/passwordSchema";

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export type Login = z.infer<typeof loginSchema>;
