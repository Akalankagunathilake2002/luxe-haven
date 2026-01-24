// src/app/dashboard/seller/properties/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import { getToken } from "@/lib/auth";
import { createProperty } from "@/lib/propertyApi";

export default function NewPropertyPage() {
  const router = useRouter();

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ fontSize: "1.6rem" }}>Create New Listing</h2>

      <div style={cardStyle}>
        <PropertyForm
          submitLabel="Create Listing"
          onSubmit={async (values) => {
            const token = getToken();
            if (!token) {
              router.push("/");
              return;
            }

            await createProperty(token, {
              title: values.title.trim(),
              price: Number(values.price),
              location: values.location.trim(),
              description: values.description.trim() || undefined,
            });

            router.push("/dashboard/seller/properties");
          }}
        />
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.9rem",
  background: "#020617",
  border: "1px solid #1f2937",
};
