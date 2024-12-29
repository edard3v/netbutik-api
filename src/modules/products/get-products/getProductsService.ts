import { and, eq, gt, like, sql } from "drizzle-orm";
import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";
import {
  categories,
  products,
  productsCategories as middleTable,
} from "../../../db/schemas";
import { DtoErr } from "../../../errors/DtoErr";

export const getProductsService = async (params: GetProducts = {}) => {
  const { page = 1, limit = 20, name, categoryId } = params;

  const where = [
    name ? like(products.name, `%${name}%`) : undefined,
    eq(products.isActive, true),
    gt(products.stock, 0),
    categoryId ? eq(middleTable.categoryId, categoryId) : undefined,
  ].filter(Boolean);

  const totalRecords = (
    await db
      .select({ id: products.id })
      .from(products)
      .leftJoin(middleTable, eq(middleTable.productId, products.id))
      .leftJoin(categories, eq(categories.id, middleTable.categoryId))
      .where(and(...where))
      .groupBy(products.id)
  ).length;

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new DtoErr();

  const records = await db
    .select({
      products: products,
      categories: sql`GROUP_CONCAT(${categories.name})`,
    })
    .from(products)
    .leftJoin(middleTable, eq(middleTable.productId, products.id))
    .leftJoin(categories, eq(categories.id, middleTable.categoryId))
    .where(and(...where))
    .limit(limit)
    .offset((page - 1) * limit)
    .groupBy(products.id);

  return {
    limit,
    page,
    totalPages,
    records,
  };
};
