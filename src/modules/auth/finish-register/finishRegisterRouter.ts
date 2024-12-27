import { Router } from "express";
import { finishRegisterController } from "./finishRegisterController";
import { verifyTokenSentByParams } from "../../../middlewares/verifyTokenSentByParams";

export const finishRegisterRouter = Router();

finishRegisterRouter.get(
  "/:token",
  verifyTokenSentByParams,
  finishRegisterController
);
