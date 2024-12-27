import { Controller } from "../../../types";
import { refreshLoginService } from "./refreshLoginService";

export const refreshLoginController: Controller = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ").at(1);

    const newToken = refreshLoginService(token as string);
    res.status(201).json({ token: newToken });
  } catch (error) {
    next(error);
  }
};
