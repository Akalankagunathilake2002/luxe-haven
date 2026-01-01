// controllers/propertyController.js
const {
  createProperty,
  getPropertyById,
  getProperties,
  getPropertiesBySellerId,
  updateProperty,
  deleteProperty,
} = require("../models/propertyModel");

// POST /api/properties  (seller creates new listing)
async function createPropertyController(req, res) {
  try {
    const sellerId = req.user.userId; // from JWT
    const { title, description, price, location } = req.body;

    if (!title || !price || !location) {
      return res
        .status(400)
        .json({ message: "title, price and location are required" });
    }

    const property = await createProperty({
      sellerId,
      title,
      description,
      price,
      location,
    });

    return res.status(201).json(property);
  } catch (err) {
    console.error("createPropertyController error:", err);
    return res.status(500).json({ message: "Server error while creating" });
  }
}

// GET /api/properties  (everyone can see all listings)
async function getAllPropertiesController(req, res) {
  try {
    const properties = await getProperties();
    return res.json(properties);
  } catch (err) {
    console.error("getAllPropertiesController error:", err);
    return res.status(500).json({ message: "Server error while fetching" });
  }
}

// GET /api/properties/:id  (single listing)
async function getPropertyByIdController(req, res) {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.json(property);
  } catch (err) {
    console.error("getPropertyByIdController error:", err);
    return res.status(500).json({ message: "Server error while fetching" });
  }
}

// GET /api/properties/mine  (seller sees his/her own listings)
async function getMyPropertiesController(req, res) {
  try {
    const sellerId = req.user.userId;
    const properties = await getPropertiesBySellerId(sellerId);
    return res.json(properties);
  } catch (err) {
    console.error("getMyPropertiesController error:", err);
    return res.status(500).json({ message: "Server error while fetching" });
  }
}

// PUT /api/properties/:id  (seller updates own listing, admin can update any)
async function updatePropertyController(req, res) {
  try {
    const { id } = req.params;
    const existing = await getPropertyById(id);

    if (!existing) {
      return res.status(404).json({ message: "Property not found" });
    }

    // only owner seller OR admin
    if (
      req.user.role === "seller" &&
      existing.seller_id !== req.user.userId
    ) {
      return res.status(403).json({ message: "Not allowed to edit this" });
    }

    const { title, description, price, location, status } = req.body;

    const updated = await updateProperty(id, {
      title: title ?? existing.title,
      description: description ?? existing.description,
      price: price ?? existing.price,
      location: location ?? existing.location,
      status: status ?? existing.status,
    });

    return res.json(updated);
  } catch (err) {
    console.error("updatePropertyController error:", err);
    return res.status(500).json({ message: "Server error while updating" });
  }
}

// DELETE /api/properties/:id  (seller deletes own listing, admin any)
async function deletePropertyController(req, res) {
  try {
    const { id } = req.params;
    const existing = await getPropertyById(id);

    if (!existing) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (
      req.user.role === "seller" &&
      existing.seller_id !== req.user.userId
    ) {
      return res.status(403).json({ message: "Not allowed to delete this" });
    }

    const ok = await deleteProperty(id);

    if (!ok) {
      return res.status(500).json({ message: "Delete failed unexpectedly" });
    }

    return res.json({ message: "Property deleted" });
  } catch (err) {
    console.error("deletePropertyController error:", err);
    return res.status(500).json({ message: "Server error while deleting" });
  }
}

module.exports = {
  createPropertyController,
  getAllPropertiesController,
  getPropertyByIdController,
  getMyPropertiesController,
  updatePropertyController,
  deletePropertyController,
};
