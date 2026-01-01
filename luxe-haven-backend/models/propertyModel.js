// models/propertyModel.js
const { sql } = require("../config/db");

/**
 * Create a new property listing
 * @param {Object} params
 * @param {number} params.sellerId - id from users table
 * @param {string} params.title
 * @param {string} [params.description]
 * @param {number} params.price
 * @param {string} params.location
 */
async function createProperty({ sellerId, title, description, price, location }) {
  const rows = await sql`
    INSERT INTO properties (seller_id, title, description, price, location)
    VALUES (${sellerId}, ${title}, ${description}, ${price}, ${location})
    RETURNING *;
  `;

  return rows[0]; // newly created row
}

/**
 * Get one property by its id
 */
async function getPropertyById(id) {
  const rows = await sql`
    SELECT *
    FROM properties
    WHERE id = ${id};
  `;

  // returns null if not found
  return rows[0] || null;
}

/**
 * Get all properties (for buyers / admin)
 */
async function getProperties() {
  const rows = await sql`
    SELECT *
    FROM properties
    ORDER BY created_at DESC;
  `;

  return rows;
}

/**
 * Get all properties for a specific seller
 */
async function getPropertiesBySellerId(sellerId) {
  const rows = await sql`
    SELECT *
    FROM properties
    WHERE seller_id = ${sellerId}
    ORDER BY created_at DESC;
  `;

  return rows;
}

/**
 * Update a property (simple full update)
 * You can call this only for fields you allow from controller.
 */
async function updateProperty(id, { title, description, price, location, status }) {
  const rows = await sql`
    UPDATE properties
    SET
      title = ${title},
      description = ${description},
      price = ${price},
      location = ${location},
      status = ${status}
    WHERE id = ${id}
    RETURNING *;
  `;

  return rows[0] || null; // null if not found
}

/**
 * Delete a property
 * @returns {boolean} true if deleted, false if not found
 */
async function deleteProperty(id) {
  const rows = await sql`
    DELETE FROM properties
    WHERE id = ${id}
    RETURNING id;
  `;

  return rows.length > 0;
}

async function getAllPropertiesWithSeller() {
  const rows = await sql`
    SELECT
      p.id,
      p.title,
      p.description,
      p.price,
      p.location,
      p.status,
      p.created_at,
      p.seller_id,
      u.name AS seller_name,
      u.email AS seller_email
    FROM properties p
    JOIN users u ON p.seller_id = u.id
    ORDER BY p.created_at DESC;
  `;
  return rows;
}

/**
 * Admin: total number of properties
 */
async function countTotalProperties() {
  const rows = await sql`
    SELECT COUNT(*)::int AS total_properties
    FROM properties;
  `;
  return rows[0].total_properties;
}

/**
 * Admin: properties grouped by status
 *  e.g. [{ status: 'available', count: 10 }, ...]
 */
async function countPropertiesByStatus() {
  const rows = await sql`
    SELECT
      status,
      COUNT(*)::int AS count
    FROM properties
    GROUP BY status;
  `;
  return rows;
}

/**
 * Admin: update only the status of a property
 */
async function updatePropertyStatus(id, status) {
  const rows = await sql`
    UPDATE properties
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null; // null if not found
}


module.exports = {
  createProperty,
  getPropertyById,
  getProperties,
  getPropertiesBySellerId,
  updateProperty,
  deleteProperty,
  getAllPropertiesWithSeller,
  countTotalProperties,
  countPropertiesByStatus,
  updatePropertyStatus,
};
