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
    if (!token) router.push("/login");
  }, [router]);

  return (
    <div className="lh-page">
      <div className="lh-topbar">
        <div>
          <div className="lh-kicker">
            <span className="lh-dot" />
            Seller Dashboard
          </div>
          <h1 className="lh-title">Welcome back</h1>
          <p className="lh-subtitle">
            Manage your property listings and track performance.
          </p>
        </div>

        <div className="lh-actions">
          <Link href="/dashboard/seller/properties" className="lh-btn-primary">
            My Properties
          </Link>

          <button
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
            className="lh-btn-ghost"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="lh-card">
        <h3 className="lh-card-title">Quick Overview</h3>
        <p className="lh-card-sub">
          View, create, and manage your property listings from here.
        </p>
      </div>
    </div>
  );
}
