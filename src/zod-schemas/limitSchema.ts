import { z } from "zod";

export const limitSchema = z.coerce
  .number({ message: "Debería ser un número." })
  .min(1);
