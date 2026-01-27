"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { fetchPropertyById, updateProperty } from "@/lib/propertyApi";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");

  useEffect(() => {
    const token = getToken();
    if (!token) return router.push("/login");
    if (!id) return;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const p = await fetchPropertyById(id);
        setTitle(p.title);
        setLocation(p.location);
        setPrice(Number(p.price));
        setDescription(p.description ?? "");
        setStatus(p.status ?? "available");
      } catch (e: any) {
        setError(e?.message || "Failed to load property");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return router.push("/login");
    if (!id) return;

    setSaving(true);
    setError(null);

    try {
      await updateProperty(token, id, {
        title: title.trim(),
        location: location.trim(),
        price: Number(price),
        description: description.trim() || undefined,
        status,
      });

      router.push("/dashboard/seller/properties");
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="lh-page">
      {/* Topbar */}
      <div className="lh-topbar">
        <div>
          <div className="lh-kicker">
            <span className="lh-dot" />
            Seller • Edit Listing
          </div>
          <h1 className="lh-title">Edit Property</h1>
          <p className="lh-subtitle">Update title, price, location, status, and description.</p>
        </div>

        <div className="lh-actions">
          <button
            type="button"
            className="lh-btn-ghost"
            onClick={() => router.push("/dashboard/seller/properties")}
          >
            ← Back to Listings
          </button>
        </div>
      </div>

      {loading && <div className="lh-card" style={{ marginTop: 14 }}>Loading...</div>}

      {!loading && (
        <div className="lh-card">
          <div className="lh-card-title">Listing Details</div>
          <div className="lh-card-sub">Make changes and save.</div>

          {error && <div className="lh-alert-error" style={{ marginTop: 14 }}>{error}</div>}

          <form onSubmit={onSubmit} className="lh-form" style={{ marginTop: 14 }}>
            <label className="lh-field">
              <span className="lh-label">Title</span>
              <input
                className="lh-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="lh-field">
              <span className="lh-label">Location</span>
              <input
                className="lh-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </label>

            <label className="lh-field">
              <span className="lh-label">Price (LKR)</span>
              <input
                className="lh-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </label>

            <label className="lh-field">
              <span className="lh-label">Status</span>
              <select className="lh-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="available">available</option>
                <option value="pending">pending</option>
                <option value="sold">sold</option>
                <option value="removed">removed</option>
              </select>
            </label>

            <label className="lh-field">
              <span className="lh-label">Description (optional)</span>
              <textarea
                className="lh-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a short description..."
              />
            </label>

            <div className="lh-actions" style={{ justifyContent: "flex-start", marginTop: 8 }}>
              <button type="submit" className="lh-btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="lh-btn-outline"
                onClick={() => router.push("/dashboard/seller/properties")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
