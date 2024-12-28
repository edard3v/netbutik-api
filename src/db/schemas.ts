import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, numeric } from "drizzle-orm/sqlite-core";

export enum Role {
  admin = "ADMIN",
  seller = "SELLER",
  client = "CLIENT",
}

export const accounts = sqliteTable("accounts", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [Role.admin, Role.client, Role.seller] }).default(
    Role.client
  ),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  name: text("name"),
  address: text("address"),
  img: text("img"),
  tel: integer("tel"),
  country: integer("country"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const bills = sqliteTable("bills", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  tel: integer("tel").notNull(),
  country: integer("country").notNull(),
  address: text("address"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  accountId: text("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "restrict" }),
});

export const products = sqliteTable("products", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").unique().notNull(),
  stock: numeric("stock").notNull(),
  buyingPrice: numeric("buying_price").notNull(),
  sellingPrice: numeric("selling_price").notNull(),
  img: text("img").notNull(),
  video: text("video").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const categories = sqliteTable("categories", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").unique().notNull(),
  img: text("img").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const suppliers = sqliteTable("suppliers", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  tel: integer("tel").notNull(),
  country: integer("country").notNull(),
  img: text("img").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

// ---------------tablas intermedias-----------

export const billsProducts = sqliteTable("bills_products", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  count: integer("count").notNull(),
  price: numeric("price").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  billId: text("bill_id")
    .notNull()
    .references(() => bills.id, { onDelete: "restrict" }),

  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "restrict" }),
});

export const productsCategories = sqliteTable("products_categories", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const productsSuppliers = sqliteTable("products_suppliers", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  supplierId: text("supplier_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

// Accounts
export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

// Bills
export type InsertBill = typeof bills.$inferInsert;
export type SelectBill = typeof bills.$inferSelect;

// BillsProducts
export type InsertBillsProduct = typeof billsProducts.$inferInsert;
export type SelectBillsProduct = typeof billsProducts.$inferSelect;

// Products
export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;

// ProductsCategories
export type InsertProductsCategory = typeof productsCategories.$inferInsert;
export type SelectProductsCategory = typeof productsCategories.$inferSelect;

// Categories
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

// Suppliers
export type InsertSupplier = typeof suppliers.$inferInsert;
export type SelectSupplier = typeof suppliers.$inferSelect;
