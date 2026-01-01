# LuxeHaven 🏡✨
A role-based real estate web application where **Sellers** can post property listings, **Buyers** can browse and purchase, and **Admins** can manage users and monitor platform activity.

---

## 📌 What is LuxeHaven?
**LuxeHaven** is a modern property marketplace built with:
- **Next.js (TypeScript)** for the frontend
- **Node.js + Express** for the backend
- **Neon PostgreSQL** for the database
- **JWT Authentication + Role-Based Access Control (RBAC)** for security

It’s designed with **minimal user input fields** to keep posting and browsing quick and easy.

---

## ✅ Key Features
### 🔐 Authentication & Roles
- Signup / Login with JWT
- Role-based access:
  - **Admin**
  - **Seller**
  - **Buyer**

### 🏠 Seller
- Create property listings (CRUD)
- View own listings
- Update / delete own listings

### 🛒 Buyer
- Browse all listings
- View listing details
- (Next step) purchase flow / checkout flow

### 🧑‍💼 Admin
- Manage users
- View all listings
- (Next step) analytics dashboard (top locations, most listed property types, etc.)

---

## 🧱 Project Structure
```bash
LuxeHaven/
  luxe-haven-backend/     # Node.js + Express + Neon(Postgres)
  luxe-haven-frontend/    # Next.js (TypeScript) app
⚙️ Tech Stack

Frontend

Next.js (App Router)

TypeScript

Tailwind / CSS (your current styling)

Backend

Node.js

Express

Neon PostgreSQL (@neondatabase/serverless)

JWT Auth

🔑 Environment Variables
Backend (luxe-haven-backend/.env)
PORT=3000
DATABASE_URL=YOUR_NEON_DATABASE_URL
JWT_SECRET=YOUR_SECRET_KEY

Frontend (luxe-haven-frontend/.env.local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000


⚠️ Never commit .env files to GitHub.

▶️ How to Run Locally
1) Run Backend
cd luxe-haven-backend
npm install
npm run dev


Backend runs on: http://localhost:3000

2) Run Frontend
cd ../luxe-haven-frontend
npm install
npm run dev


Frontend runs on: http://localhost:3001 (if 3000 is already used)

🧪 API Endpoints (Current)
Auth

POST /api/auth/signup

POST /api/auth/login

Dashboards

GET /api/dashboard/admin (admin only)

GET /api/dashboard/seller (seller only)

GET /api/dashboard/buyer (buyer only)

Properties (CRUD)

POST /api/properties (seller only)

GET /api/properties (public)

GET /api/properties/:id (public)

GET /api/properties/mine (seller only)

PUT /api/properties/:id (seller owner or admin)

DELETE /api/properties/:id (seller owner or admin)

🧠 Future Improvements

Buyer purchase flow (orders)

Admin analytics dashboard (charts)

Image upload for listings

Search + filters (location, price range)

Pagination for listings

👤 Author

Akalanka Gunathilake
Software Engineering Undergraduate | Full Stack Developer

📧 Email: akalankaharshana2002@gmail.com

🌐 GitHub: Akalankagunathilake2002
