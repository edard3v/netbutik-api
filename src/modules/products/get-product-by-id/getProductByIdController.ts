import { UUID } from "crypto";
import { Controller } from "../../../types";
import { getProductByIdService } from "./getProductByIdService";

export const getProductByIdController: Controller = async (_req, res, next) => {
  try {
    const { id } = res.locals.params as { id: UUID };
    const product = await getProductByIdService(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
