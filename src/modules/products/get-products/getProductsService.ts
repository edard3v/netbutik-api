import { and, eq, gt, like, sql } from "drizzle-orm";
import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";
import { categories, products, productsCategories } from "../../../db/schemas";
import { PageErr } from "../../../errors/PageErr";

export const getProductsService = async (params: GetProducts = {}) => {
  const { page = 1, limit = 20, name, categoryId } = params;

  const where = [
    name ? like(products.name, `%${name}%`) : undefined,
    eq(products.isActive, true),
    gt(products.stock, 0),
  ].filter(Boolean);

  const totalRecords = await db
    .select({ id: products.id })
    .from(products)
    .leftJoin(productsCategories, eq(products.id, productsCategories.productId))
    .where(and(...where))
    .groupBy(products.id)
    .having(
      categoryId ? eq(productsCategories.categoryId, categoryId) : undefined
    );

  const totalPages = Math.ceil(totalRecords.length / limit) || 1;
  if (page > totalPages) throw new PageErr();

  const records = await db
    .select({
      id: products.id,
      name: products.name,
      stock: products.stock,
      price: products.sellingPrice,
      img: products.img,
      description: products.description,
      categories: sql<string>`
      CASE
        WHEN ${categories.id} IS NULL THEN '[]'
        ELSE JSON_GROUP_ARRAY(JSON_OBJECT('id', ${categories.id}, 'name', ${categories.name}))
      END`,
    })
    .from(products)
    .leftJoin(productsCategories, eq(products.id, productsCategories.productId))
    .leftJoin(categories, eq(categories.id, productsCategories.categoryId))
    .where(and(...where))
    .groupBy(products.id)
    .having(
      categoryId ? eq(productsCategories.categoryId, categoryId) : undefined
    )
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    limit,
    page,
    totalPages,
    records: records.map((record) => ({
      ...record,
      categories: JSON.parse(record.categories),
    })),
  };
};
