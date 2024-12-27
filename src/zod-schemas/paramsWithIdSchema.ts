import { z } from "zod";
import { uuidSchema } from "./uuidSchema";

export const paramsWithIdSchema = z.object({ id: uuidSchema }).strict();
