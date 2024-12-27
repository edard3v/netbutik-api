import { Controller } from "../../../types";
import { Register } from "./registerSchema";
import { registerService } from "./registerService";

export const registerController: Controller = async (_req, res, next) => {
  try {
    const register = res.locals?.body as Register;
    await registerService(register);
    res
      .status(200)
      .json({
        msg: "Por favor, verifique su registro haciendo clic en el enlace enviado a su correo.",
      });
  } catch (error) {
    next(error);
  }
};
