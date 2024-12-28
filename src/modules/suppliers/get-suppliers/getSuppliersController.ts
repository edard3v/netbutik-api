import { Controller } from "../../../types";
import { getSuppliersService } from "./getSuppliersService";

export const getSuppliersController: Controller = async (_req, res, next) => {
  try {
    const suppliers = await getSuppliersService();
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};
