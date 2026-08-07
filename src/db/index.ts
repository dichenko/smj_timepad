import { drizzle } from "drizzle-orm/node-postgres"; import { Pool } from "pg"; import * as schema from "./schema";
const databaseName = process.env.POSTGRES_DB ?? "conference";
const databaseUser = process.env.POSTGRES_USER ?? "conference";
const databasePassword = process.env.POSTGRES_PASSWORD;
// The placeholder keeps `next build` independent from deployment secrets.
const url = databasePassword
  ? `postgresql://${encodeURIComponent(databaseUser)}:${encodeURIComponent(databasePassword)}@${process.env.POSTGRES_HOST ?? "postgres"}:5432/${encodeURIComponent(databaseName)}`
  : "postgresql://invalid:invalid@127.0.0.1:1/invalid";
export const pool = new Pool({ connectionString: url }); export const db = drizzle(pool, { schema });
