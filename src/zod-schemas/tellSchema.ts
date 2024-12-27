import { z } from "zod";
import { REGEX } from "../regex/regex";

export const tellSchema = z
  .string()
  .min(1, { message: "Mín 1 dígito." })
  .max(25, { message: "Max 25 dígitos." })
  .refine((tell) => REGEX.tell.test(tell), {
    message: "No es un tell",
  });
