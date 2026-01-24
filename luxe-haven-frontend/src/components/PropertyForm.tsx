// src/components/PropertyForm.tsx
"use client";

import { useState } from "react";

type FormValues = {
  title: string;
  price: string; // keep as string in input, convert later
  location: string;
  description: string;
};

export default function PropertyForm({
  initialValues,
  submitLabel,
  onSubmit,
}: {
  initialValues?: Partial<FormValues>;
  submitLabel: string;
  onSubmit: (values: FormValues) => Promise<void>;
}) {
  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? "",
    price: initialValues?.price ?? "",
    location: initialValues?.location ?? "",
    description: initialValues?.description ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormValues>(key: K, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!values.title || !values.price || !values.location) {
      setError("Title, price, and location are required.");
      return;
    }

    const priceNum = Number(values.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      setError("Price must be a valid number greater than 0.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.9rem" }}>
      {error && (
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            background: "#7f1d1d",
            color: "#fee2e2",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      <label>
        Title *
        <input
          value={values.title}
          onChange={(e) => updateField("title", e.target.value)}
          style={inputStyle}
          placeholder="e.g., 2BR Apartment in Colombo"
        />
      </label>

      <label>
        Price (LKR) *
        <input
          value={values.price}
          onChange={(e) => updateField("price", e.target.value)}
          style={inputStyle}
          placeholder="e.g., 25000000"
          inputMode="numeric"
        />
      </label>

      <label>
        Location *
        <input
          value={values.location}
          onChange={(e) => updateField("location", e.target.value)}
          style={inputStyle}
          placeholder="e.g., Colombo 5"
        />
      </label>

      <label>
        Description (optional)
        <textarea
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          style={{ ...inputStyle, minHeight: 110 }}
          placeholder="Short details..."
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.7rem 1rem",
          borderRadius: "999px",
          border: "none",
          fontWeight: 700,
          background: loading ? "#4b5563" : "#22c55e",
          color: "#020617",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "0.25rem",
  padding: "0.55rem 0.7rem",
  borderRadius: "0.5rem",
  border: "1px solid #4b5563",
  background: "#020617",
  color: "#f9fafb",
  fontSize: "0.95rem",
};
