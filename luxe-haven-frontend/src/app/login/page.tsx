// src/app/login/page.tsx
"use client";

import React, { FormEvent, useState } from "react";
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
  dashboardPath: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin1@example.com");
  const [password, setPassword] = useState("Admin123!");
  const [showPw, setShowPw] = useState(false);

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // ✅ use backend path (make sure backend returns /dashboard/...)
      router.push(data.dashboardPath || "/");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageWrap}>
      <div className="login-shell" style={shell}>
        {/* Brand / left panel */}
        <div style={stripe}>
          <div style={stripeGlowTop} />
          <div style={stripeGlowBottom} />

          <div style={{ position: "relative" }}>
            <div style={badge}>
              <span style={dot} />
              PREMIUM REAL ESTATE
            </div>

            <div style={brandTitle}>
              Luxe<span style={{ color: "#b07a52" }}>Haven</span>
            </div>

            <div style={brandSub}>
              Sign in to save properties, get personalized recommendations, and access your dashboard.
            </div>

            <div style={miniStats}>
              <div style={statCard}>
                <div style={statNum}>500+</div>
                <div style={statLbl}>Premium Properties</div>
              </div>
              <div style={statCard}>
                <div style={statNum}>98%</div>
                <div style={statLbl}>Satisfaction</div>
              </div>
              <div style={statCard}>
                <div style={statNum}>25+</div>
                <div style={statLbl}>Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={card}>
          <div style={{ marginBottom: 18 }}>
            <div style={title}>Welcome back</div>
            <div style={subtitle}>Log in to continue your journey.</div>
          </div>

          {error && (
            <div style={alert("error")}>
              <strong style={{ fontWeight: 800 }}>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <label style={label}>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={input}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label style={label}>
              Password
              <div style={pwWrap}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...input, paddingRight: 64, marginTop: 0 }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  style={pwBtn}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button type="submit" disabled={loading} style={primaryBtn(loading)}>
              {loading ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span style={spinner} />
                  Signing in...
                </span>
              ) : (
                "Log In"
              )}
            </button>

            <div style={bottomRow}>
              <span style={{ color: "rgba(27,27,27,.6)" }}>Don&apos;t have an account?</span>
              <button type="button" onClick={() => router.push("/signup")} style={linkBtn}>
                Create one
              </button>
            </div>

            <div style={finePrint}>
              By continuing, you agree to our <a style={fineLink} href="/terms">Terms</a> and{" "}
              <a style={fineLink} href="/privacy">Privacy Policy</a>.
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (min-width: 980px) {
          .login-shell {
            grid-template-columns: 0.95fr 1.05fr;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================
   Styles (LuxeHaven theme)
========================= */
const pageWrap: React.CSSProperties = {
  minHeight: "calc(100vh - 64px)",
  display: "grid",
  placeItems: "center",
  padding: "28px 14px",
  background: "linear-gradient(180deg, #f7f1ea 0%, #ffffff 60%)",
};

const shell: React.CSSProperties = {
  width: "min(980px, 100%)",
  display: "grid",
  gridTemplateColumns: "1fr",
  borderRadius: 28,
  overflow: "hidden",
  border: "1px solid rgba(176, 122, 82, 0.18)",
  boxShadow: "0 25px 70px rgba(176, 122, 82, 0.18)",
  background: "rgba(255,255,255,.7)",
  backdropFilter: "blur(14px)",
};

const stripe: React.CSSProperties = {
  position: "relative",
  padding: "28px 24px",
  background:
    "linear-gradient(135deg, rgba(176,122,82,.20) 0%, rgba(154,102,67,.08) 45%, rgba(255,255,255,.0) 100%)",
  borderBottom: "1px solid rgba(176, 122, 82, 0.12)",
};

const stripeGlowTop: React.CSSProperties = {
  position: "absolute",
  top: -120,
  left: -120,
  width: 260,
  height: 260,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(176,122,82,.35), transparent 60%)",
  filter: "blur(6px)",
};

const stripeGlowBottom: React.CSSProperties = {
  position: "absolute",
  bottom: -120,
  right: -120,
  width: 260,
  height: 260,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(154,102,67,.25), transparent 60%)",
  filter: "blur(6px)",
};

const badge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,.65)",
  border: "1px solid rgba(176, 122, 82, 0.18)",
  color: "#4a3c2d",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.16em",
};

const dot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 99,
  background: "linear-gradient(135deg, #b07a52, #9a6643)",
  boxShadow: "0 0 0 6px rgba(176,122,82,.12)",
};

const brandTitle: React.CSSProperties = {
  marginTop: 14,
  fontSize: 34,
  fontWeight: 950,
  letterSpacing: "-0.02em",
  color: "#2b221b",
  lineHeight: 1.1,
};

const brandSub: React.CSSProperties = {
  marginTop: 10,
  fontSize: 14,
  lineHeight: 1.6,
  color: "rgba(43,34,27,.72)",
  maxWidth: 520,
};

const miniStats: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 10,
  marginTop: 18,
};

const statCard: React.CSSProperties = {
  borderRadius: 16,
  border: "1px solid rgba(176, 122, 82, 0.14)",
  background: "rgba(255,255,255,.65)",
  padding: "12px 10px",
  textAlign: "center",
};

const statNum: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 950,
  color: "#2b221b",
};

const statLbl: React.CSSProperties = {
  marginTop: 4,
  fontSize: 11,
  fontWeight: 800,
  color: "rgba(154,102,67,.9)",
};

const card: React.CSSProperties = {
  padding: "26px 22px",
  background: "rgba(255,255,255,.78)",
};

const title: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 950,
  color: "#1b1b1b",
  letterSpacing: "-0.02em",
};

const subtitle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 14,
  color: "rgba(27,27,27,.62)",
  lineHeight: 1.6,
};

const label: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  color: "rgba(27,27,27,.78)",
  display: "grid",
  gap: 8,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(176, 122, 82, 0.20)",
  background: "rgba(251, 247, 242, 0.9)",
  color: "#1b1b1b",
  fontSize: 14,
  outline: "none",
  boxShadow: "0 1px 0 rgba(0,0,0,.02) inset",
};

const pwWrap: React.CSSProperties = {
  position: "relative",
};

const pwBtn: React.CSSProperties = {
  position: "absolute",
  right: 8,
  top: "50%",
  transform: "translateY(-50%)",
  border: "1px solid rgba(176, 122, 82, 0.18)",
  background: "rgba(255,255,255,.75)",
  color: "#9a6643",
  fontWeight: 900,
  fontSize: 12,
  padding: "7px 12px",
  borderRadius: 999,
  cursor: "pointer",
};

const primaryBtn = (loading: boolean): React.CSSProperties => ({
  marginTop: 6,
  width: "100%",
  padding: "12px 16px",
  borderRadius: 999,
  border: "none",
  background: loading
    ? "linear-gradient(135deg, rgba(176,122,82,.55), rgba(154,102,67,.55))"
    : "linear-gradient(135deg, #b07a52 0%, #9a6643 100%)",
  color: "#fff",
  fontWeight: 950,
  fontSize: 14,
  cursor: loading ? "not-allowed" : "pointer",
  boxShadow: "0 10px 25px rgba(176, 122, 82, 0.22)",
});

const spinner: React.CSSProperties = {
  width: 16,
  height: 16,
  borderRadius: 999,
  border: "2px solid rgba(255,255,255,.55)",
  borderTopColor: "#fff",
  animation: "spin 1s linear infinite",
};

const bottomRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  marginTop: 8,
  fontSize: 13,
};

const linkBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#b07a52",
  fontWeight: 950,
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: 4,
};

const finePrint: React.CSSProperties = {
  marginTop: 10,
  fontSize: 12,
  color: "rgba(27,27,27,.55)",
  textAlign: "center",
  lineHeight: 1.6,
};

const fineLink: React.CSSProperties = {
  color: "#9a6643",
  fontWeight: 800,
  textDecoration: "none",
};

function alert(kind: "error" | "success"): React.CSSProperties {
  if (kind === "error") {
    return {
      marginBottom: 14,
      padding: "12px 12px",
      borderRadius: 14,
      background: "rgba(255, 107, 107, .12)",
      border: "1px solid rgba(255, 107, 107, .25)",
      color: "#7a1d1d",
      fontSize: 13,
      lineHeight: 1.5,
    };
  }
  return {
    marginBottom: 14,
    padding: "12px 12px",
    borderRadius: 14,
    background: "rgba(34, 197, 94, .12)",
    border: "1px solid rgba(34, 197, 94, .25)",
    color: "#14532d",
    fontSize: 13,
    lineHeight: 1.5,
  };
}
