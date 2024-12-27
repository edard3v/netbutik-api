process.loadEnvFile();
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  // driver: "turso",
  dbCredentials: {
    url: "file:./src/db/template.db",
    // url: process.env.DATABASE_URL!,
    // authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
