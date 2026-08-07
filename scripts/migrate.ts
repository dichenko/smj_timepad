import { readFile } from "node:fs/promises"; import { pool } from "../src/db";
async function main(){const migration=await readFile(new URL("../drizzle/0000_initial.sql",import.meta.url),"utf8");await pool.query(migration);console.log("Migration complete");await pool.end()} main().catch(e=>{console.error(e);process.exit(1)});
