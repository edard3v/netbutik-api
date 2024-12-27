import { Router } from "express";
import { loginRouter } from "./login/loginRouter";
import { refreshTokenRouter } from "./refresh-token/refreshTokenRouter";
import { registerRouter } from "./register/registerRouter";
import { finishRegisterRouter } from "./finish-register/finishRegisterRouter";

export const authRouter = Router();

authRouter.use("/register", registerRouter);
authRouter.use("/finish-register", finishRegisterRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/refresh-token", refreshTokenRouter);
