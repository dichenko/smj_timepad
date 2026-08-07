import { drizzle } from "drizzle-orm/node-postgres"; import { Pool } from "pg"; import * as schema from "./schema";
// Docker passes DATABASE_URL when the application container starts. A harmless
// placeholder keeps `next build` independent from deployment secrets.
const url = process.env.DATABASE_URL ?? "postgresql://invalid:invalid@127.0.0.1:1/invalid";
export const pool = new Pool({ connectionString: url }); export const db = drizzle(pool, { schema });
