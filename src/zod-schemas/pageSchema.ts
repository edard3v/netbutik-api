import { z } from "zod";

export const pageSchema = z.coerce
  .number({ message: "Debería ser un número." })
  .min(1);
