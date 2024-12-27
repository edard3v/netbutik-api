import { Controller } from "../../../types";
import { refreshTokenService } from "./refreshTokenService";

export const refreshTokenController: Controller = async (req, res, next) => {
  try {
    const token = refreshTokenService(req.headers.authorization as string);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
