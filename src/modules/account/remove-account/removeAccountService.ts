import { eq } from "drizzle-orm";
import { db } from "../../../db/db";
import { UUID } from "crypto";
import { accounts } from "../../../db/schemas";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";

export const removeAccountService = async (accountId: UUID) => {
  const result = await db.delete(accounts).where(eq(accounts.id, accountId));

  if (!result.rowsAffected) throw new RecordNotFoundErr();
};
