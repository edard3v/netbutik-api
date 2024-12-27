import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { removeAccountService } from "./removeAccountService";

export const removeAccountController: Controller = async (_req, res, next) => {
  try {
    const { id } = res.locals?.tokenPayload as TokenPayload;
    await removeAccountService(id);

    res.status(200).json({ msg: "Cuenta borrada correctamente" });
  } catch (error) {
    next(error);
  }
};
