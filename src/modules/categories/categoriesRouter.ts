import { Router } from "express";
import { getCategoriesRouter } from "./get-categories/getCategoriesRouter";

export const categoriesRouter = Router();

categoriesRouter.use("/get-categories", getCategoriesRouter);
