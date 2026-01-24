export default function ContactPage() {
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
        Contact Us
      </h2>

      <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "1rem" }}>
        Have a question or need support? Reach us through the details below.
      </p>

      <div
        style={{
          marginTop: "1.25rem",
          display: "grid",
          gap: "0.75rem",
          color: "#0f172a",
          fontSize: "1rem",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong style={{ color: "#111827" }}>Email:</strong>{" "}
          <span style={{ color: "#334155" }}>support@luxehaven.com</span>
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: "#111827" }}>Phone:</strong>{" "}
          <span style={{ color: "#334155" }}>+94 XX XXX XXXX</span>
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: "#111827" }}>Location:</strong>{" "}
          <span style={{ color: "#334155" }}>Sri Lanka</span>
        </p>
      </div>
    </div>
  );
}
