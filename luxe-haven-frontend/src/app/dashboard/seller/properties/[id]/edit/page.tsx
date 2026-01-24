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
    if (!token) return router.push("/");

    async function load() {
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
        setError(e.message || "Failed to load property");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return router.push("/");

    setSaving(true);
    setError(null);

    try {
      await updateProperty(token, id, { title, location, price, description, status });
      router.push("/dashboard/seller/properties");
    } catch (e: any) {
      setError(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ fontSize: "1.4rem" }}>Edit Listing</h2>
      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}

      <form onSubmit={onSubmit} style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} required />
        </label>

        <label>
          Location
          <input value={location} onChange={(e) => setLocation(e.target.value)} style={input} required />
        </label>

        <label>
          Price (LKR)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={input}
            required
          />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={input}>
            <option value="available">available</option>
            <option value="pending">pending</option>
            <option value="sold">sold</option>
            <option value="removed">removed</option>
          </select>
        </label>

        <label>
          Description (optional)
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={textarea} />
        </label>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button type="submit" disabled={saving} style={primaryBtn}>
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/seller/properties")}
            style={secondaryBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  marginTop: 6,
  padding: "0.55rem 0.7rem",
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#020617",
  color: "#f9fafb",
} as const;

const textarea = {
  ...input,
  minHeight: 110,
} as const;

const primaryBtn = {
  padding: "0.55rem 1rem",
  borderRadius: 999,
  border: "none",
  fontWeight: 800,
  background: "#22c55e",
  color: "#020617",
  cursor: "pointer",
} as const;

const secondaryBtn = {
  padding: "0.55rem 1rem",
  borderRadius: 999,
  border: "1px solid #334155",
  fontWeight: 800,
  background: "transparent",
  color: "#f9fafb",
  cursor: "pointer",
} as const;
