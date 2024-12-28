import { accounts, categories, suppliers } from "./schemas";
import { db } from "./db";
import { ACCOUNTS } from "./drafts/accounts.draft";
import { CATEGORIES } from "./drafts/categories.draft";
import { SUPPLIERS } from "./drafts/suppliers.draft";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);

  await db.delete(categories).execute();
  await db.insert(categories).values(CATEGORIES);

  await db.delete(suppliers).execute();
  await db.insert(suppliers).values(SUPPLIERS);
};

seed().catch(console.error);
