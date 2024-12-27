import { Controller } from "../../../types";
import { loginService } from "./loginService";
import { Login } from "./loginSchema";

export const loginController: Controller = async (req, res, next) => {
  try {
    const login = res.locals?.body as Login;
    const token = await loginService(login);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
