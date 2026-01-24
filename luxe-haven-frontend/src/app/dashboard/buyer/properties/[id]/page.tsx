"use client";

import { useEffect, useState } from "react";
import { fetchPropertyById, Property } from "@/lib/propertyApi";
import { useParams, useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function BuyerPropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/");
      return;
    }

    fetchPropertyById(params.id)
      .then(setItem)
      .catch((e) => setError(e.message || "Failed to load property"));
  }, [params.id, router]);

  return (
    <div>
      <button
        onClick={() => router.back()}
        style={{ ...btn, background: "#334155", color: "#f9fafb" }}
      >
        ← Back
      </button>

      {error && <p style={{ marginTop: "1rem", color: "#fca5a5" }}>{error}</p>}
      {!error && !item && <p style={{ marginTop: "1rem" }}>Loading...</p>}

      {item && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            borderRadius: "0.9rem",
            background: "#020617",
            border: "1px solid #1f2937",
          }}
        >
          <h2 style={{ fontSize: "1.6rem" }}>{item.title}</h2>
          <p style={{ marginTop: "0.35rem", opacity: 0.9 }}>
            {item.location} • LKR {Number(item.price).toLocaleString()}
          </p>
          <p style={{ marginTop: "0.35rem", opacity: 0.8 }}>
            Status: {item.status}
          </p>

          {item.description && (
            <p style={{ marginTop: "0.8rem", opacity: 0.85 }}>
              {item.description}
            </p>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => alert("Next: implement buy/contact workflow")}
              style={btn}
            >
              Buy / Contact Seller
            </button>
          </div>
        </div>
      )}
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
