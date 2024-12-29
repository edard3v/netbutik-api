import { and, eq, gt, like } from "drizzle-orm";
import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";
import { products } from "../../../db/schemas";
import { DtoErr } from "../../../errors/DtoErr";

export const getProductsService = async (params: GetProducts = {}) => {
  const { page = 1, limit = 20, name } = params;

  const conditions = [
    name ? like(products.name, `%${name}%`) : undefined,
    eq(products.isActive, true),
    gt(products.stock, 0),
  ].filter(Boolean);

  const totalRecords = (
    await db.query.products.findMany({ where: and(...conditions) })
  ).length;

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new DtoErr();

  const records = await db.query.products.findMany({
    where: and(...conditions),
    limit,
    offset: (page - 1) * limit,
  });

  return {
    limit,
    page,
    totalPages,
    records,
  };
};
