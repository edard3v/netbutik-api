import { z } from "zod";
import { pageSchema } from "../../../zod-schemas/pageSchema";
import { limitSchema } from "../../../zod-schemas/limitSchema";
import { uuidSchema } from "../../../zod-schemas/uuidSchema";

export const getProductsSchema = z
  .object({
    name: z.string().max(100),
    category: uuidSchema,
    page: pageSchema,
    limit: limitSchema,
  })
  .partial()
  .strict();

export type GetProducts = z.infer<typeof getProductsSchema>;
