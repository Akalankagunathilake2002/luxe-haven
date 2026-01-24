// src/app/dashboard/seller/properties/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { deleteProperty, getMyProperties, Property } from "@/lib/propertyApi";
import PropertyCard from "@/components/PropertyCard";

export default function SellerPropertiesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const token = getToken();
    if (!token) {
      router.push("/");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const data = await getMyProperties(token);
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: number) {
    const token = getToken();
    if (!token) return router.push("/");

    const ok = confirm("Delete this property?");
    if (!ok) return;

    try {
      await deleteProperty(token, id);
      // quick UI update without re-fetch
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ fontSize: "1.6rem" }}>My Properties</h2>
        <Link href="/dashboard/seller/properties/new" style={btnStyle}>
          + New Listing
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}

      {!loading && !error && items.length === 0 && (
        <div style={emptyStyle}>
          No listings yet. Create your first one!
        </div>
      )}

      <div style={{ display: "grid", gap: "0.9rem" }}>
        {items.map((p) => (
          <PropertyCard key={p.id} property={p} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "0.6rem 1rem",
  borderRadius: "999px",
  background: "#22c55e",
  color: "#020617",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const emptyStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.9rem",
  background: "#020617",
  border: "1px solid #1f2937",
  opacity: 0.9,
};
