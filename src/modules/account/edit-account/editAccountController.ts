import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { EditAccount } from "./editAccountSchema";
import { editAccountService } from "./editAccountService";

export const updateAccountController: Controller = async (_req, res, next) => {
  try {
    const { id: accountId } = res.locals?.tokenPayload as TokenPayload;
    const colums = res.locals?.body as EditAccount;
    await editAccountService(accountId, colums);

    res.status(200).json({ msg: "Cuenta actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};
