import { Router } from "express";
import { loginController } from "./loginController";
import { loginSchema } from "./loginSchema";
import { verifyDto } from "../../../middlewares/verifyDto";

export const loginRouter = Router();

loginRouter.post("", verifyDto({ body: loginSchema }), loginController);
