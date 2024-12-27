import { db } from "../../../db/db";
import { accounts } from "../../../db/schemas";
import { eq } from "drizzle-orm";
import { UUID } from "crypto";
import { EditAccount } from "./editAccountSchema";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";
import { Bcrypt } from "../../../services/bcrypt/bcrypt";

export const editAccountService = async (
  accountId: UUID,
  colums: EditAccount
) => {
  const newColums = { ...colums };
  const isImgStringEmpty = newColums.img === "";

  if (newColums.password) {
    newColums.password = Bcrypt.hash(newColums.password);
  }

  const result = await db
    .update(accounts)
    .set({ ...newColums, img: isImgStringEmpty ? null : newColums.img })
    .where(eq(accounts.id, accountId));

  if (!result.rowsAffected) throw new RecordNotFoundErr();
};
