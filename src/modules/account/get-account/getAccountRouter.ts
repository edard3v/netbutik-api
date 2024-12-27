import { Router } from "express";
import { getAccountController } from "./getAccountController";
import { verifyToken } from "../../../middlewares/verifyToken";

export const getAccountRouter = Router();

getAccountRouter.get("/", verifyToken(), getAccountController);
