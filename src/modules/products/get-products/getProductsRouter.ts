import { Router } from "express";
import { getProductsController } from "./getProductsController";
import { verifyDto } from "../../../middlewares/verifyDto";
import { getProductsSchema } from "./getProductsSchema";

export const getProductsRouter = Router();

getProductsRouter.get(
  "/",
  verifyDto({ query: getProductsSchema }),
  getProductsController
);
