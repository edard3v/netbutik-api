import { Controller } from "../../../types";
import { GetProducts } from "./getProductsSchema";
import { getProductsService } from "./getProductsService";

export const getProductsController: Controller = async (_req, res, next) => {
  try {
    const filters = res.locals.query as GetProducts;
    const products = await getProductsService(filters);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
