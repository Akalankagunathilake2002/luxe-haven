require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

// Neon SQL client
const sql = neon(process.env.DATABASE_URL);

module.exports = { sql };
