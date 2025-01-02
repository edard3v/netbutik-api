import { eq, sql } from "drizzle-orm";
import { db } from "../../../db/db";
import {
  products,
  productsCategories as middle,
  categories,
} from "../../../db/schemas";
import { UUID } from "crypto";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";

export const getProductByIdService = async (productId: UUID) => {
  const [product] = await db
    .select({
      product: products,
      categories: sql`
      CASE
        WHEN ${categories.id} IS NULL THEN NULL
        ELSE GROUP_CONCAT(${categories.name})
      END
      `,
    })
    .from(products)
    .where(eq(products.id, productId))
    .leftJoin(middle, eq(middle.productId, products.id))
    .leftJoin(categories, eq(categories.id, middle.categoryId))
    .groupBy(products.id);

  if (!product) throw new RecordNotFoundErr();
  return product;
};
