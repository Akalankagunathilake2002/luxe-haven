// authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../config/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["buyer", "seller", "admin"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Role must be buyer, seller, or admin" });
    }

    // check if email exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // insert user
    const inserted = await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${name}, ${email}, ${passwordHash}, ${role})
      RETURNING id, name, email, role, created_at
    `;

    const user = inserted[0];

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // find user by email
    const rows = await sql`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // decide dashboard path for frontend
    let dashboardPath = "";
    if (user.role === "admin") dashboardPath = "/admin/dashboard";
    if (user.role === "seller") dashboardPath = "/seller/dashboard";
    if (user.role === "buyer") dashboardPath = "/buyer/dashboard";

    // don’t send password hash to client
    delete user.password_hash;

    return res.json({
      message: "Login successful",
      token,
      user,
      dashboardPath, // frontend will use this to redirect
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
