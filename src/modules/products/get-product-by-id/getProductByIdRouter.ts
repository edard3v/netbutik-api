import { Router } from "express";
import { verifyDto } from "../../../middlewares/verifyDto";
import { getProductByIdController } from "./getProductByIdController";
import { paramsWithIdSchema } from "../../../zod-schemas/paramsWithIdSchema";

export const getProductByIdRouter = Router();

getProductByIdRouter.get(
  "/:id",
  verifyDto({ params: paramsWithIdSchema }),
  getProductByIdController
);
