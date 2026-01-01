// app/dashboard/seller/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

interface SellerResponse {
  message: string;
  user: {
    userId: number;
    role: string;
  };
}

export default function SellerDashboard() {
  const router = useRouter();
  const [data, setData] = useState<SellerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      router.push("/");
      return;
    }

    apiRequest<SellerResponse>("/api/dashboard/seller", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(setData)
      .catch((err) => {
        setError(err.message || "Failed to load seller dashboard");
        setTimeout(() => router.push("/"), 1200);
      });
  }, [router]);

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
        Seller Dashboard
      </h2>
      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
      {!error && !data && <p>Loading...</p>}
      {data && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            borderRadius: "0.75rem",
            background: "#020617",
            border: "1px solid #1f2937",
          }}
        >
          <p>{data.message}</p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.8 }}>
            userId: {data.user.userId} | role: {data.user.role}
          </p>
        </div>
      )}
    </div>
  );
}
