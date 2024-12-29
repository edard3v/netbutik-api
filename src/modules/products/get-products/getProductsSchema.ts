import { z } from "zod";
import { pageSchema } from "../../../zod-schemas/pageSchema";
import { limitSchema } from "../../../zod-schemas/limitSchema";
import { uuidSchema } from "../../../zod-schemas/uuidSchema";

export const getProductsSchema = z
  .object({
    name: z.string().max(100),
    categoryId: uuidSchema,
    page: pageSchema,
    limit: limitSchema,
    // isActive: z.coerce.number().int().min(0).max(1),
  })
  .partial()
  .strict();

export type GetProducts = z.infer<typeof getProductsSchema>;
