import { db } from "../../../db/db";
import { GetProducts } from "./getProductsSchema";

export const getProductsService = async (params: GetProducts = {}) => {
  const { page = 1, limit = 20 } = params;

  const products = await db.query.products.findMany({
    limit,
    offset: (page - 1) * limit,
  });

  return {
    page,
    limit,
    records: products,
  };
};
