import { Router } from "express";
import { WelcomeController } from "./welcomeController";

export const welcomeRouter = Router();

welcomeRouter.get("", WelcomeController);
