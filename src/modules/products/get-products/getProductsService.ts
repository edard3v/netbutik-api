import { and, eq, gt, like, sql } from "drizzle-orm";
import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";
import { categories, products, productsCategories } from "../../../db/schemas";
import { DtoErr } from "../../../errors/DtoErr";

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
    .groupBy(products.id);

  const totalPages = Math.ceil(totalRecords.length / limit) || 1;
  if (page > totalPages) throw new DtoErr();

  const records = await db
    .select({
      id: products.id,
      name: products.name,
      stock: products.stock,
      price: products.sellingPrice,
      img: products.img,
      createdAt: products.createdAt,
      category: sql`GROUP_CONCAT(${categories.name})`,
    })
    .from(products)
    .leftJoin(productsCategories, eq(products.id, productsCategories.productId))
    .leftJoin(categories, eq(categories.id, productsCategories.categoryId))
    .where(and(...where))
    .limit(limit)
    .offset((page - 1) * limit)
    .groupBy(products.id)
    .having(
      categoryId
        ? sql`SUM(CASE WHEN ${categories.id} = ${categoryId} THEN 1 ELSE 0 END) > 0`
        : undefined
    );

  return {
    limit,
    page,
    totalPages,
    records,
  };
};

// categoryId ? eq(productsCategories.categoryId, categoryId) : undefined,
