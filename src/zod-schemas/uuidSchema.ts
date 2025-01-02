import { z } from "zod";

export const uuidSchema = z
  .string()
  .length(36, { message: "Debería ser un uuid." });
