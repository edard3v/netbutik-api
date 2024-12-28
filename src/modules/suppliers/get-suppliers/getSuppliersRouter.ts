import { Router } from "express";
import { getSuppliersController } from "./getSuppliersController";

export const getSuppliersRouter = Router();

getSuppliersRouter.get("/", getSuppliersController);
