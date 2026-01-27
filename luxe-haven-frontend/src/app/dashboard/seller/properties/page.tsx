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
      router.push("/login");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const data = await getMyProperties(token);
      setItems(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load properties");
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
    if (!token) return router.push("/login");

    const ok = confirm("Delete this property?");
    if (!ok) return;

    try {
      await deleteProperty(token, id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    }
  }

  return (
    <div className="lh-page">
      {/* Topbar */}
      <div className="lh-topbar">
        <div>
          <div className="lh-kicker">
            <span className="lh-dot" />
            Seller • Listings
          </div>
          <h1 className="lh-title">My Properties</h1>
          <p className="lh-subtitle">Create, update, and manage your property listings.</p>
        </div>

        <div className="lh-actions">
          <Link href="/dashboard/seller" className="lh-btn-ghost">
            ← Dashboard
          </Link>
          <Link href="/dashboard/seller/properties/new" className="lh-btn-primary">
            + New Listing
          </Link>
        </div>
      </div>

      {loading && (
        <div className="lh-card" style={{ marginTop: 14 }}>
          Loading...
        </div>
      )}

      {error && <div className="lh-alert-error">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="lh-card">
          <div className="lh-card-title">No listings yet</div>
          <div className="lh-card-sub">Create your first property listing to get started.</div>
          <Link
            href="/dashboard/seller/properties/new"
            className="lh-btn-primary"
            style={{ display: "inline-block", marginTop: 14 }}
          >
            Create Listing
          </Link>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {items.map((p) => (
            <PropertyCard key={p.id} property={p} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
