import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Mín 6 dígitos." })
  .max(127, { message: "Max 127 dígitos." });
