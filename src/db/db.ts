import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schemas from "./schemas";
// import * as relations from "./relations";

const client = createClient({
  url: "file:./src/db/netbutik.db",
  // url: process.env.DATABASE_URL!,
  // authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema: { ...schemas } });
