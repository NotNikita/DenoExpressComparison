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

// Counts rows in the deno_cars table
export async function countRows() {
  const result = await sql`SELECT COUNT(*) FROM "deno_cars"`;
  return result[0].count;
}

export default sql;
