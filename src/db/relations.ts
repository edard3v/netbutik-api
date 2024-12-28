import { relations } from "drizzle-orm/relations";
import {
  accounts,
  bills,
  products,
  billsProducts,
  categories,
  productsCategories,
  productsSuppliers,
} from "./schemas";

export const billsRelations = relations(bills, ({ one, many }) => ({
  account: one(accounts, {
    fields: [bills.accountId],
    references: [accounts.id],
  }),
  billsProducts: many(billsProducts),
}));

export const accountsRelations = relations(accounts, ({ many }) => ({
  bills: many(bills),
}));

export const billsProductsRelations = relations(billsProducts, ({ one }) => ({
  product: one(products, {
    fields: [billsProducts.productId],
    references: [products.id],
  }),
  bill: one(bills, {
    fields: [billsProducts.billId],
    references: [bills.id],
  }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  billsProducts: many(billsProducts),
  productsCategories: many(productsCategories),
  productsSuppliers: many(productsSuppliers),
}));

export const productsCategoriesRelations = relations(
  productsCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [productsCategories.categoryId],
      references: [categories.id],
    }),
    product: one(products, {
      fields: [productsCategories.productId],
      references: [products.id],
    }),
  })
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  productsCategories: many(productsCategories),
  productsSuppliers: many(productsSuppliers),
}));

export const productsSuppliersRelations = relations(
  productsSuppliers,
  ({ one }) => ({
    category: one(categories, {
      fields: [productsSuppliers.supplierId],
      references: [categories.id],
    }),
    product: one(products, {
      fields: [productsSuppliers.productId],
      references: [products.id],
    }),
  })
);
