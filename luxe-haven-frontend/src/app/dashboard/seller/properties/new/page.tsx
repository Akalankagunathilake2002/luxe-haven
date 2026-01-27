"use client";

import { useRouter } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import { getToken } from "@/lib/auth";
import { createProperty } from "@/lib/propertyApi";

export default function NewPropertyPage() {
  const router = useRouter();

  return (
    <div className="lh-page">
      {/* Topbar */}
      <div className="lh-topbar">
        <div>
          <div className="lh-kicker">
            <span className="lh-dot" />
            Seller • Create
          </div>
          <h1 className="lh-title">Create New Listing</h1>
          <p className="lh-subtitle">Add a new property with price, location, and description.</p>
        </div>

        <div className="lh-actions">
          <button
            onClick={() => router.push("/dashboard/seller/properties")}
            className="lh-btn-ghost"
            type="button"
          >
            ← Back to Listings
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="lh-card">
        <div className="lh-card-title">Property Details</div>
        <div className="lh-card-sub">Fill the form and publish your listing.</div>

        <div style={{ marginTop: 14 }}>
          <PropertyForm
            submitLabel="Create Listing"
            onSubmit={async (values) => {
              const token = getToken();
              if (!token) {
                router.push("/login");
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
    </div>
  );
}
