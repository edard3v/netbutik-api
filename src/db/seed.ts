import {
  accounts,
  categories,
  products,
  productsCategories,
  suppliers,
} from "./schemas";
import { db } from "./db";
import { ACCOUNTS } from "./drafts/accounts.draft";
import { CATEGORIES } from "./drafts/categories.draft";
import { SUPPLIERS } from "./drafts/suppliers.draft";
import { PRODUCTS } from "./drafts/products.draft";
import { PRODUCTS_CATEGORIES } from "./drafts/productsCategories.draft";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);

  await db.delete(categories).execute();
  await db.insert(categories).values(CATEGORIES);

  await db.delete(suppliers).execute();
  await db.insert(suppliers).values(SUPPLIERS);

  await db.delete(products).execute();
  await db.insert(products).values(PRODUCTS);

  await db.delete(productsCategories).execute();
  await db.insert(productsCategories).values(PRODUCTS_CATEGORIES);
};

seed().catch(console.error);
