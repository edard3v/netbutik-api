import { Router } from "express";
import { loginRouter } from "./login/loginRouter";
import { refreshTokenRouter } from "./refresh-token/refreshTokenRouter";
import { registerRouter } from "./register/registerRouter";
import { verifyRegisterRouter } from "./verify-register/verifyRegisterRouter";

export const authRouter = Router();

authRouter.use("/register", registerRouter);
authRouter.use("/verify-register", verifyRegisterRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/refresh-token", refreshTokenRouter);
