import { Router } from "express";
import { verifyToken } from "../../../middlewares/verifyToken";
import { editAccountSchema } from "./editAccountSchema";
import { updateAccountController } from "./editAccountController";
import { verifyDto } from "../../../middlewares/verifyDto";

export const editAccountRouter = Router();

editAccountRouter.patch(
  "",
  [verifyToken(), verifyDto({ body: editAccountSchema })],
  updateAccountController
);
