import { and, eq, gt, like } from "drizzle-orm";
import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";
import {
  categories,
  products,
  productsCategories as middle,
} from "../../../db/schemas";
import { DtoErr } from "../../../errors/DtoErr";

export const getProductsService = async (params: GetProducts = {}) => {
  const { page = 1, limit = 20, name, categoryId } = params;

  const where = [
    name ? like(products.name, `%${name}%`) : undefined,
    eq(products.isActive, true),
    gt(products.stock, 0),
    categoryId ? eq(middle.categoryId, categoryId) : undefined,
  ].filter(Boolean);

  const totalRecords = (
    await db
      .select({ id: products.id })
      .from(products)
      .leftJoin(middle, eq(middle.productId, products.id))
      .leftJoin(categories, eq(categories.id, middle.categoryId))
      .where(and(...where))
      .groupBy(products.id)
  ).length;

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new DtoErr();

  const records = await db
    .select()
    .from(products)
    .leftJoin(middle, eq(middle.productId, products.id))
    .leftJoin(categories, eq(categories.id, middle.categoryId))
    .where(and(...where))
    .limit(limit)
    .offset((page - 1) * limit);

  const recordsFormated = [];
  for (let i = 0; i < records.length; i++) {
    const tuple = records[i];
    const { categories: category, products } = tuple;

    const recordFound = recordsFormated.find((item) => item.id === products.id);

    if (recordFound?.id) {
      recordFound.categories.push(category);
    }

    recordsFormated.push({
      ...products,
      categories: [category].filter(Boolean),
    });
  }

  return {
    limit,
    page,
    totalPages,
    records: recordsFormated,
  };
};
