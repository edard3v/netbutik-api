import { z } from "zod";

export const imgSchema = z
  .string()
  .url({ message: "Debería ser una url." })
  .or(z.literal("null"));
