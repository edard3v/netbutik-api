import { Router } from "express";
import { verifyToken } from "../../../middlewares/verifyToken";
import { refreshLoginController } from "./refreshLoginController";

export const refreshLoginRouter = Router();

refreshLoginRouter.post("", verifyToken(), refreshLoginController);
