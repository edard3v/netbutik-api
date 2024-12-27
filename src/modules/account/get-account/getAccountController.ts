import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { getAccountService } from "./getAccountService";

export const getAccountController: Controller = async (_req, res, next) => {
  try {
    const { id } = res.locals?.tokenPayload as TokenPayload;
    const account = await getAccountService(id);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
