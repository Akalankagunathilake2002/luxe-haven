// routes/propertyRoutes.js
const express = require("express");
const { authRequired, requireRole } = require("../middleware/authMiddleware");
const {
  createPropertyController,
  getAllPropertiesController,
  getPropertyByIdController,
  getMyPropertiesController,
  updatePropertyController,
  deletePropertyController,
} = require("../controllers/propertyController");

const router = express.Router();

// PUBLIC: get all properties
// GET /api/properties
router.get("/", getAllPropertiesController);

// PUBLIC: get one property
// GET /api/properties/:id
router.get("/:id", getPropertyByIdController);

// SELLER: create new property
// POST /api/properties
router.post(
  "/",
  authRequired,
  requireRole("seller"),
  createPropertyController
);

// SELLER: view own properties
// GET /api/properties/mine
router.get(
  "/mine",
  authRequired,
  requireRole("seller"),
  getMyPropertiesController
);

// SELLER/ADMIN: update property
// PUT /api/properties/:id
router.put(
  "/:id",
  authRequired,
  requireRole("seller", "admin"),
  updatePropertyController
);

// SELLER/ADMIN: delete property
// DELETE /api/properties/:id
router.delete(
  "/:id",
  authRequired,
  requireRole("seller", "admin"),
  deletePropertyController
);

module.exports = router;
