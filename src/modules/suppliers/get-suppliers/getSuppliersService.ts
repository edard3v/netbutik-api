import { db } from "../../../db/db";

export const getSuppliersService = async () => {
  const suppliers = await db.query.suppliers.findMany();

  return suppliers;
};
