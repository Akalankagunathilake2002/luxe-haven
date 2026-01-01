// routes/adminRoutes.js
const express = require("express");
const {
  authRequired,
  requireRole,
} = require("../middleware/authMiddleware");

const {
  getAllUsersController,
  getAdminOverviewStatsController,
  getAllPropertiesAdminController,
  updatePropertyStatusAdminController,
} = require("../controllers/adminController");

const router = express.Router();

// Apply admin auth to all routes in this router:
// Every route here requires a valid token AND role 'admin'.
router.use(authRequired, requireRole("admin"));

// GET /api/admin/users
router.get("/users", getAllUsersController);

// GET /api/admin/stats/overview
router.get("/stats/overview", getAdminOverviewStatsController);

// GET /api/admin/properties
router.get("/properties", getAllPropertiesAdminController);

// PATCH /api/admin/properties/:id/status
router.patch("/properties/:id/status", updatePropertyStatusAdminController);

module.exports = router;
