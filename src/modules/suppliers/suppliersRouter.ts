import { Router } from "express";
import { getSuppliersRouter } from "./get-suppliers/getSuppliersRouter";

export const suppliersRouter = Router();

suppliersRouter.use("/get-suppliers", getSuppliersRouter);
