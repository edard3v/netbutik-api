import { Router } from "express";
import { verifyRegisterController } from "./verifyRegisterController";
import { verifyTokenSentByParams } from "../../../middlewares/verifyTokenSentByParams";

export const verifyRegisterRouter = Router();

verifyRegisterRouter.get(
  "/:token",
  verifyTokenSentByParams,
  verifyRegisterController
);
