import { Router } from "express";
import { getProductsRouter } from "./get-products/getProductsRouter";

export const productsRouter = Router();

productsRouter.use("/get-products", getProductsRouter);
