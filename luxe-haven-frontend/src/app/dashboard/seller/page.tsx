// src/app/dashboard/seller/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuth, getToken } from "@/lib/auth";
import { useEffect } from "react";

export default function SellerDashboardHome() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/");
  }, [router]);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
        Seller Dashboard
      </h2>

      <div style={cardStyle}>
        <p style={{ opacity: 0.9 }}>
          Manage your listings here.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Link href="/dashboard/seller/properties" style={btnStyle}>
            My Properties
          </Link>

          <button
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
            style={{ ...btnStyle, background: "#334155" }}
          >
            Logout
          </button>
        </div>
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

const btnStyle: React.CSSProperties = {
  padding: "0.6rem 1rem",
  borderRadius: "999px",
  border: "none",
  background: "#22c55e",
  color: "#020617",
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};
