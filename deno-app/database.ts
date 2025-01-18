import postgres from "postgres";
import config from "./config.ts";
import { Car } from "./types.ts";

const sql = postgres({
  hostname: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  max: config.db.maxConnections,
});

// Inserts a car into PG database
export async function saveCarInDB({ id, producer, year }: Car) {
  return sql`INSERT INTO "deno_cars" (id, producer, year) VALUES (${id}, ${producer}, ${year})`;
}

// Logs existing tables in the database
export async function logExistingTables() {
  const result =
    await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  console.log(
    "Existing tables:",
    result.map((row: any) => row.table_name)
  );
}

export default sql;
