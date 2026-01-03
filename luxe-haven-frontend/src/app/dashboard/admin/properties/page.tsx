"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { fetchMyProperties, deleteProperty, PropertyRow } from "@/lib/propertyApi";

export default function SellerPropertiesPage() {
  const router = useRouter();
  const [items, setItems] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const token = getToken();
    if (!token) {
      router.push("/");
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      const data = await fetchMyProperties(token);
      setItems(data);
    } catch (e: any) {
      setErr(e.message || "Server error while fetching");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: number) {
    const token = getToken();
    if (!token) return router.push("/");

    const ok = confirm("Delete this listing?");
    if (!ok) return;

    try {
      await deleteProperty(token, id);
      await load();
    } catch (e: any) {
      alert(e.message || "Delete failed");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.4rem" }}>My Properties</h2>

        <button
          onClick={() => router.push("/dashboard/seller/properties/new")}
          style={{
            padding: "0.5rem 0.9rem",
            borderRadius: 999,
            border: "none",
            fontWeight: 700,
            background: "#22c55e",
            color: "#020617",
            cursor: "pointer",
          }}
        >
          + New Listing
        </button>
      </div>

      {loading && <p style={{ marginTop: "1rem" }}>Loading...</p>}
      {err && <p style={{ marginTop: "1rem", color: "#fca5a5" }}>{err}</p>}

      {!loading && !err && items.length === 0 && (
        <p style={{ marginTop: "1rem", opacity: 0.8 }}>No listings yet.</p>
      )}

      {!loading && !err && items.length > 0 && (
        <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
          {items.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "1rem",
                borderRadius: "0.9rem",
                border: "1px solid #1f2937",
                background: "#020617",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                  <p style={{ margin: "0.35rem 0", opacity: 0.85 }}>
                    {p.location} • LKR {p.price}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.75 }}>
                    Status: {p.status}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", alignItems: "start" }}>
                  <button
                    onClick={() => router.push(`/dashboard/seller/properties/${p.id}/edit`)}
                    style={btn("edit")}
                  >
                    Edit
                  </button>

                  <button onClick={() => onDelete(p.id)} style={btn("delete")}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function btn(type: "edit" | "delete") {
  return {
    padding: "0.45rem 0.75rem",
    borderRadius: 999,
    border: "1px solid #334155",
    background: type === "delete" ? "#7f1d1d" : "#0b1220",
    color: "#f9fafb",
    cursor: "pointer",
    fontWeight: 700,
  } as const;
}
