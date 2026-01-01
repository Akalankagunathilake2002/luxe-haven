// models/userModel.js
// This model contains all DB queries related to users (for admin)

const { sql } = require("../config/db");

/**
 * Get all users (for admin user list)
 */
async function getAllUsers() {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      role,
      created_at
    FROM users
    ORDER BY created_at DESC;
  `;
  // rows is an array of user objects
  return rows;
}

/**
 * Count total users
 */
async function countTotalUsers() {
  const rows = await sql`
    SELECT COUNT(*)::int AS total_users
    FROM users;
  `;
  return rows[0].total_users;
}

/**
 * Count users per role (admin / seller / buyer)
 */
async function countUsersByRole() {
  const rows = await sql`
    SELECT
      role,
      COUNT(*)::int AS count
    FROM users
    GROUP BY role;
  `;
  // returns array like [{ role: 'admin', count: 1 }, ...]
  return rows;
}

module.exports = {
  getAllUsers,
  countTotalUsers,
  countUsersByRole,
};
