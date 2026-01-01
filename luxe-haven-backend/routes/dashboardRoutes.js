// routes/dashboardRoutes.js
const express = require("express");
const { authRequired, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin dashboard
// GET /api/dashboard/admin
router.get(
  "/admin",
  authRequired,
  requireRole("admin"),
  (req, res) => {
    res.json({
      message: "Admin dashboard data",
      user: req.user, // { userId, role }
    });
  }
);

// Seller dashboard
// GET /api/dashboard/seller
router.get(
  "/seller",
  authRequired,
  requireRole("seller"),
  (req, res) => {
    res.json({
      message: "Seller dashboard data",
      user: req.user,
    });
  }
);

// Buyer dashboard
// GET /api/dashboard/buyer
router.get(
  "/buyer",
  authRequired,
  requireRole("buyer"),
  (req, res) => {
    res.json({
      message: "Buyer dashboard data",
      user: req.user,
    });
  }
);

module.exports = router;
