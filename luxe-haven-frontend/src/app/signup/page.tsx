// app/signup/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

interface SignupResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "admin" | "seller" | "buyer";
  };
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("Test Buyer");
  const [email, setEmail] = useState("buyer@example.com");
  const [password, setPassword] = useState("Buyer123!");
  const [role, setRole] = useState<"admin" | "seller" | "buyer">("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const data = await apiRequest<SignupResponse>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });
      setSuccess(data.message);
      setTimeout(() => {
        router.push("/"); // go back to login
      }, 800);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 460,
        margin: "0 auto",
        background: "#020617",
        padding: "2rem",
        borderRadius: "1rem",
        border: "1px solid #1f2937",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Sign up</h2>
      <p style={{ marginBottom: "1rem", fontSize: "0.9rem", opacity: 0.8 }}>
        Create an account as buyer, seller, or admin.
      </p>

      {error && (
        <div style={alertStyle("#7f1d1d", "#fee2e2")}>{error}</div>
      )}
      {success && (
        <div style={alertStyle("#14532d", "#bbf7d0")}>{success}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label style={{ fontSize: "0.9rem" }}>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        </label>

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

        <label style={{ fontSize: "0.9rem" }}>
          Role
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "admin" | "seller" | "buyer")
            }
            style={{
              ...inputStyle,
              paddingRight: "2rem",
            }}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
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
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
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
  fontSize: "0.9rem",
};

function alertStyle(bg: string, color: string): React.CSSProperties {
  return {
    marginBottom: "1rem",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    background: bg,
    color,
    fontSize: "0.85rem",
  };
}
