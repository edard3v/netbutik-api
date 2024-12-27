import { ZodSchema } from "zod";
import { Next, Req, Res } from "../types";

export const verifyDto = ({ body, params, query }: Params) => {
  return (req: Req, res: Res, next: Next) => {
    try {
      if (body) {
        const bodyParsed = body.parse(req.body);
        res.locals = { ...res.locals, body: bodyParsed };
      }
      if (params) {
        const paramsParsed = params.parse(req.params);
        res.locals = { ...res.locals, params: paramsParsed };
      }
      if (query) {
        const queryParsed = query.parse(req.query);
        res.locals = { ...res.locals, query: queryParsed };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

type Params = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};
