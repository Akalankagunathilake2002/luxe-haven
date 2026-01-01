// src/app/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "admin" | "seller" | "buyer";
  };
  dashboardPath: string; // not used now but ok to keep
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin1@example.com");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiRequest<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // store token & role in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
      }

      // ✅ redirect to the route that matches your folder structure
      //    admin  -> /dashboard/admin
      //    seller -> /dashboard/seller
      //    buyer  -> /dashboard/buyer
      const path =
        data.user.role === "admin"
          ? "/dashboard/admin"
          : data.user.role === "seller"
          ? "/dashboard/seller"
          : "/dashboard/buyer";

      router.push(path);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        background: "#020617",
        padding: "2rem",
        borderRadius: "1rem",
        border: "1px solid #1f2937",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Sign in</h2>
      <p style={{ marginBottom: "1rem", fontSize: "0.9rem", opacity: 0.8 }}>
        Login as admin, seller, or buyer.
      </p>

      {error && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            background: "#7f1d1d",
            color: "#fee2e2",
            fontSize: "0.85rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label style={{ fontSize: "0.9rem" }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <label style={{ fontSize: "0.9rem" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "0.5rem",
            padding: "0.7rem 1rem",
            borderRadius: "999px",
            border: "none",
            fontWeight: 600,
            background: loading ? "#4b5563" : "#22c55e",
            color: "#020617",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.85rem",
          textAlign: "center",
          opacity: 0.8,
        }}
      >
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          style={{
            background: "none",
            border: "none",
            color: "#38bdf8",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

// simpler style typing – no React import needed
const inputStyle = {
  width: "100%",
  marginTop: "0.25rem",
  padding: "0.55rem 0.7rem",
  borderRadius: "0.5rem",
  border: "1px solid #4b5563",
  background: "#020617",
  color: "#f9fafb",
  fontSize: "0.9rem",
} as const;
