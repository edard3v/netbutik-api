import { Router } from "express";
import { getProductsRouter } from "./get-products/getProductsRouter";
import { getProductByIdRouter } from "./get-product-by-id/getProductByIdRouter";

export const productsRouter = Router();

productsRouter.use("/get-products", getProductsRouter);
productsRouter.use("/get-product-by-id", getProductByIdRouter);
