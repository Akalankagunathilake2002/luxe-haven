// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sql } = require("./config/db");

const authRoutes = require("./routes/authRoutes");          // signup/login
const dashboardRoutes = require("./routes/dashboardRoutes"); // dashboards
const propertyRoutes = require("./routes/propertyRoutes");   // 🏠 properties
const adminRoutes = require("./routes/adminRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// simple test route
app.get("/", async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    res.json({
      message: "LuxeHaven API running",
      postgresVersion: result[0].version,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});

// auth routes (signup/login)
app.use("/api/auth", authRoutes);

// dashboard routes (role-based)
app.use("/api/dashboard", dashboardRoutes);

// property routes (seller CRUD, public list)
app.use("/api/properties", propertyRoutes);

app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
