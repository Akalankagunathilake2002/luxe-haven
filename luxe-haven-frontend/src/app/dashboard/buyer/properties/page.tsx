"use client";

import { useEffect, useState } from "react";
import { fetchAllProperties, Property } from "@/lib/propertyApi";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function BuyerPropertiesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // buyer can be public, but you can also require login:
    const token = getToken();
    if (!token) {
      router.push("/");
      return;
    }

    fetchAllProperties()
      .then(setItems)
      .catch((e) => setError(e.message || "Failed to load properties"));
  }, [router]);

  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
        Browse Properties
      </h2>

      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
      {!error && items.length === 0 && <p>No listings yet.</p>}

      <div style={{ display: "grid", gap: "0.9rem", marginTop: "1rem" }}>
        {items.map((p) => (
          <div
            key={p.id}
            style={{
              padding: "1rem",
              borderRadius: "0.9rem",
              background: "#020617",
              border: "1px solid #1f2937",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{p.title}</strong>
              <span style={{ opacity: 0.8 }}>{p.status}</span>
            </div>

            <p style={{ marginTop: "0.35rem", opacity: 0.9 }}>
              {p.location} • LKR {Number(p.price).toLocaleString()}
            </p>

            {p.description && (
              <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>
                {p.description}
              </p>
            )}

            <div style={{ marginTop: "0.9rem", display: "flex", gap: "0.6rem" }}>
              <button
                onClick={() => router.push(`/dashboard/buyer/properties/${p.id}`)}
                style={btn}
              >
                View
              </button>

              {/* Later you can add "Buy" flow: create an order/payment */}
              <button
                onClick={() => alert("Next step: implement buy workflow")}
                style={{ ...btn, background: "#0ea5e9" }}
              >
                Buy / Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "0.55rem 0.9rem",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  background: "#22c55e",
  color: "#020617",
};
