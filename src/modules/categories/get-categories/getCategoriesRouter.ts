import { Router } from "express";
import { getCategoriesController } from "./getCategoriesController";

export const getCategoriesRouter = Router();

getCategoriesRouter.get("/", getCategoriesController);
