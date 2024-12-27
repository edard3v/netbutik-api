import { Controller } from "../../types";
import { welcomeService } from "./welcomeService";

export const WelcomeController: Controller = async (_req, res) => {
  const welcome = welcomeService();
  res.status(200).json(welcome);
};
