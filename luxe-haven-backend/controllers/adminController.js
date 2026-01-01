// controllers/adminController.js
// All logic for admin-only operations

const userModel = require("../models/userModel");
const propertyModel = require("../models/propertyModel");

/**
 * GET /api/admin/users
 * Admin: list all users
 */
async function getAllUsersController(req, res) {
  try {
    const users = await userModel.getAllUsers();
    return res.json(users);
  } catch (err) {
    console.error("getAllUsersController error:", err);
    return res.status(500).json({ message: "Server error getting users" });
  }
}

/**
 * GET /api/admin/stats/overview
 * Admin: high-level counts for dashboard
 */
async function getAdminOverviewStatsController(req, res) {
  try {
    // Run queries in parallel for speed
    const [
      totalUsers,
      usersByRole,
      totalProperties,
      propertiesByStatus,
    ] = await Promise.all([
      userModel.countTotalUsers(),
      userModel.countUsersByRole(),
      propertyModel.countTotalProperties(),
      propertyModel.countPropertiesByStatus(),
    ]);

    return res.json({
      totalUsers,
      usersByRole,         // array of { role, count }
      totalProperties,
      propertiesByStatus,  // array of { status, count }
    });
  } catch (err) {
    console.error("getAdminOverviewStatsController error:", err);
    return res.status(500).json({ message: "Server error getting stats" });
  }
}

/**
 * GET /api/admin/properties
 * Admin: view all properties with seller info
 */
async function getAllPropertiesAdminController(req, res) {
  try {
    const properties = await propertyModel.getAllPropertiesWithSeller();
    return res.json(properties);
  } catch (err) {
    console.error("getAllPropertiesAdminController error:", err);
    return res.status(500).json({ message: "Server error getting properties" });
  }
}

/**
 * PATCH /api/admin/properties/:id/status
 * Admin: change property status (e.g. 'available', 'sold', 'removed')
 */
async function updatePropertyStatusAdminController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["available", "sold", "pending", "removed"];
    if (!status || !allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: `status is required and must be one of: ${allowedStatuses.join(", ")}` });
    }

    const updated = await propertyModel.updatePropertyStatus(id, status);

    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.json({
      message: "Property status updated",
      property: updated,
    });
  } catch (err) {
    console.error("updatePropertyStatusAdminController error:", err);
    return res.status(500).json({ message: "Server error updating status" });
  }
}

module.exports = {
  getAllUsersController,
  getAdminOverviewStatsController,
  getAllPropertiesAdminController,
  updatePropertyStatusAdminController,
};
