import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { env } from "@/common/utils/env-config";


import * as schema from "./schema";
import pg  from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: env.databaseUrl,
    ssl: true
});

export const database: NodePgDatabase<typeof schema> = drizzle({ client: pool , schema: schema });


