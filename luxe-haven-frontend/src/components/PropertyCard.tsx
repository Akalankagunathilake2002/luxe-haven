// src/components/PropertyCard.tsx
"use client";

import Link from "next/link";
import { Property } from "@/lib/propertyApi";

export default function PropertyCard({
  property,
  onDelete,
}: {
  property: Property;
  onDelete: (id: number) => Promise<void>;
}) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "0.9rem",
        background: "#020617",
        border: "1px solid #1f2937",
        display: "grid",
        gap: "0.5rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700 }}>
            {property.title}
          </div>
          <div style={{ opacity: 0.85, fontSize: "0.9rem" }}>
            {property.location} • LKR {property.price}
          </div>
        </div>

        <span
          style={{
            alignSelf: "start",
            padding: "0.25rem 0.6rem",
            borderRadius: "999px",
            border: "1px solid #334155",
            fontSize: "0.8rem",
            opacity: 0.9,
          }}
        >
          {property.status}
        </span>
      </div>

      {property.description ? (
        <div style={{ opacity: 0.85, fontSize: "0.9rem" }}>
          {property.description}
        </div>
      ) : null}

      <div style={{ display: "flex", gap: 10, marginTop: "0.25rem" }}>
        <Link
          href={`/dashboard/seller/properties/${property.id}/edit`}
          style={btnStyle}
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(property.id)}
          style={{ ...btnStyle, background: "#7f1d1d", color: "#fee2e2" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.55rem 0.9rem",
  borderRadius: "999px",
  border: "1px solid #334155",
  background: "#0b1220",
  color: "#f9fafb",
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: 600,
};
