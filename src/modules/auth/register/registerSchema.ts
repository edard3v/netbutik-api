import z from "zod";
import { emailSchema } from "../../../zod-schemas/emailSchema";
import { passwordSchema } from "../../../zod-schemas/passwordSchema";

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export type Register = z.infer<typeof registerSchema>;
