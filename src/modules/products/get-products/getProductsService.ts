import { and, eq, gt, like } from "drizzle-orm";
import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";
import { products, productsCategories } from "../../../db/schemas";
import { DtoErr } from "../../../errors/DtoErr";

export const getProductsService = async (params: GetProducts = {}) => {
  const { page = 1, limit = 20, name, categoryId } = params;

  const where = [
    name ? like(products.name, `%${name}%`) : undefined,
    eq(products.isActive, true),
    gt(products.stock, 0),
    categoryId ? eq(productsCategories.categoryId, categoryId) : undefined,
  ].filter(Boolean);

  const totalRecords = (
    await db
      .select({ id: products.id })
      .from(products)
      .leftJoin(
        productsCategories,
        eq(productsCategories.productId, products.id)
      )
      .where(and(...where))
      .groupBy(products.id)
  ).length;

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new DtoErr();

  const records = await db
    .select({
      id: products.id,
      name: products.name,
      stock: products.stock,
      buyingPrice: products.buyingPrice,
      sellingPrice: products.sellingPrice,
      img: products.img,
      video: products.video,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updateAt: products.updateAt,
    })
    .from(products)
    .leftJoin(productsCategories, eq(productsCategories.productId, products.id))
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
