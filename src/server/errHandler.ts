import { ZodError } from "zod";
import { EdarErr } from "../errors/EdarErr";
import { ErrHandler } from "../types";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";
import { DtoErr } from "../errors/DtoErr";
import { LoginErr } from "../errors/LoginErr";
import { RecordNotFoundErr } from "../errors/RecordNotFoundErr";
import { PageErr } from "../errors/PageErr";

export const errorHandler: ErrHandler = (error, _req, res, _next) => {
  if (
    error instanceof EdarErr ||
    error instanceof UnauthorizedErr ||
    error instanceof DtoErr ||
    error instanceof PageErr ||
    error instanceof LoginErr ||
    error instanceof RecordNotFoundErr
  ) {
    const { status, msg } = error;
    return res.status(status).json({ msg });
  }

  if (error instanceof ZodError) {
    return res.status(400).json(error);
  }

  return res.status(500).json(error);
};
