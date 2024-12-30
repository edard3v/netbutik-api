// process.loadEnvFile(".env");
import "../services/dotenv/loadEnvFile";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schemas from "./schemas";
import * as relations from "./relations";

export const CONFIG_DB = {
  // url: "file:./src/db/netbutik.db",
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
};

const client = createClient(CONFIG_DB);

export const db = drizzle(client, {
  schema: { ...schemas, ...relations },
});
