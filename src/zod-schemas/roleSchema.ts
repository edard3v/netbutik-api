import { z } from "zod";
import { Role } from "../db/schemas";

export const roleSchema = z.nativeEnum(Role);
