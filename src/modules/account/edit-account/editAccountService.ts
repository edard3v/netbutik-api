import { db } from "../../../db/db";
import { accounts } from "../../../db/schemas";
import { eq } from "drizzle-orm";
import { UUID } from "crypto";

import { BCRYPT } from "../../../config/bcrypt";
import bcrypt from "bcrypt";
import { EditAccount } from "./editAccountSchema";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";

export const editAccountService = async (
  accountId: UUID,
  colums: EditAccount
) => {
  const newColums = { ...colums };
  const isImgStringEmpty = newColums.img === "";

  if (newColums.password) {
    newColums.password = await bcrypt.hash(newColums.password, BCRYPT.salt);
  }

  const result = await db
    .update(accounts)
    .set({ ...newColums, img: isImgStringEmpty ? null : newColums.img })
    .where(eq(accounts.id, accountId));

  if (!result.rowsAffected) throw new RecordNotFoundErr();
};
