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

// ✅ PUBLIC: get all properties
router.get("/", getAllPropertiesController);

// ✅ SELLER: view own properties (MUST BE BEFORE "/:id")
router.get(
  "/mine",
  authRequired,
  requireRole("seller"),
  getMyPropertiesController
);

// ✅ PUBLIC: get one property
router.get("/:id", getPropertyByIdController);

// ✅ SELLER: create new property
router.post(
  "/",
  authRequired,
  requireRole("seller"),
  createPropertyController
);

// ✅ SELLER/ADMIN: update property
router.put(
  "/:id",
  authRequired,
  requireRole("seller", "admin"),
  updatePropertyController
);

// ✅ SELLER/ADMIN: delete property
router.delete(
  "/:id",
  authRequired,
  requireRole("seller", "admin"),
  deletePropertyController
);

module.exports = router;
