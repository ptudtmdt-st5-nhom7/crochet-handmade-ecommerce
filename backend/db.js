const path = require("node:path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const { Pool } = require("pg");

const pool = new Pool({
  connectionTimeoutMillis: 5000,
  query_timeout: 5000,
});

pool.on("error", () => {
  console.error("Ket noi PostgreSQL trong pool bi gian doan.");
});

module.exports = pool;