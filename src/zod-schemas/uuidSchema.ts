import { z } from "zod";

export const uuidSchema = z.string().uuid({ message: "Debería ser un uuid." });
