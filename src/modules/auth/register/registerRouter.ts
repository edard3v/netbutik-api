import { Router } from "express";
import { registerController } from "./registerController";
import { registerSchema } from "./registerSchema";
import { verifyDto } from "../../../middlewares/verifyDto";

export const registerRouter = Router();

registerRouter.post(
  "/",
  verifyDto({ body: registerSchema }),
  registerController
);
