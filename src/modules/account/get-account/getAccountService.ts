import { db } from "../../../db/db";
import { UUID } from "crypto";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";

export const getAccountService = async (accountId: UUID) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.id, accountId),
  });

  if (!account) throw new RecordNotFoundErr();

  return account;
};
