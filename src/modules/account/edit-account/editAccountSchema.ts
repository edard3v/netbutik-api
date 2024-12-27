import { z } from "zod";
import { nameSchema } from "../../../zod-schemas/nameSchema";
import { imgSchema } from "../../../zod-schemas/imgSchema";
import { passwordSchema } from "../../../zod-schemas/passwordSchema";

export const editAccountSchema = z
  .object({
    name: nameSchema,
    img: imgSchema,
    password: passwordSchema,
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message:
      "Mani, ¿para qué pides actualizar si no envías nada para actualizar?",
  });

export type EditAccount = z.infer<typeof editAccountSchema>;
