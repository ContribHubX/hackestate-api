import { defineConfig } from "drizzle-kit";
import { env } from "./src/common/utils/env-config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/index.ts",
  out: "./src/database/migrations",
  dbCredentials: {  
    url: env.databaseUrl!
  }
}) 



