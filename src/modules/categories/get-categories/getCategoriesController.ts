import { Controller } from "../../../types";
import { getCategoriesService } from "./getCategoriesService";

export const getCategoriesController: Controller = async (_req, res, next) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
