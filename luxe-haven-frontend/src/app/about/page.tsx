export default function AboutPage() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "1rem",
        border: "1px solid #e5e7eb",
        boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ fontSize: "1.75rem", marginBottom: "0.75rem", fontWeight: 900 }}>
        About LuxeHaven
      </h2>

      <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "1rem" }}>
        LuxeHaven is a role-based real estate platform where sellers can create
        listings, buyers can browse properties, and admins can monitor the
        system and manage listings.
      </p>

      <div style={{ marginTop: "1.25rem" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Roles & Features
        </h3>

        <ul
          style={{
            margin: 0,
            paddingLeft: "1.1rem",
            color: "#334155",
            lineHeight: 1.9,
            fontSize: "1rem",
          }}
        >
          <li>
            <strong style={{ color: "#0f172a" }}>Seller:</strong> add, edit, delete
            property listings
          </li>
          <li>
            <strong style={{ color: "#0f172a" }}>Buyer:</strong> view and explore
            available properties
          </li>
          <li>
            <strong style={{ color: "#0f172a" }}>Admin:</strong> view users + stats +
            manage property status
          </li>
        </ul>
      </div>
    </div>
  );
}
