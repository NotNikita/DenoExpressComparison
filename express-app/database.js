const postgres = require("postgres");
const { config } = require("./config");

const sql = postgres({
  hostname: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  max: config.db.maxConnections,
});

function saveCarInDB({ id, producer, year }) {
  return sql`INSERT INTO "express_cars" (id, producer, year) VALUES (${id}, ${producer}, ${year})`;
}

// Counts rows in the deno_cars table
async function countRows() {
  const result = await sql`SELECT COUNT(*) FROM public.deno_cars`;
  return result[0].count;
}

module.exports = {
  saveCarInDB,
  countRows,
};
