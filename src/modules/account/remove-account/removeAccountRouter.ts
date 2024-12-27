import { Router } from "express";
import { verifyToken } from "../../../middlewares/verifyToken";
import { removeAccountController } from "./removeAccountController";

export const removeAccountRouter = Router();

removeAccountRouter.delete("/", verifyToken(), removeAccountController);
