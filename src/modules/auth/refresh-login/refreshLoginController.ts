import { Controller } from "../../../types";
import { refreshLoginService } from "./refreshLoginService";

export const refreshLoginController: Controller = async (req, res, next) => {
  try {
    const token = refreshLoginService(req.headers.authorization as string);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
