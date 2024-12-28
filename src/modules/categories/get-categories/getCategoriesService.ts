import { db } from "../../../db/db";

export const getCategoriesService = async () => {
  const categories = await db.query.categories.findMany();

  return categories;
};
