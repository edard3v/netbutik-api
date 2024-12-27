import { Router } from "express";
import { refreshTokenController } from "./refreshTokenController";
import { verifyToken } from "../../../middlewares/verifyToken";

export const refreshTokenRouter = Router();

refreshTokenRouter.post("", verifyToken(), refreshTokenController);
