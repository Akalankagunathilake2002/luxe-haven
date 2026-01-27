// app/dashboard/buyer/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

interface BuyerResponse {
  message: string;
  user: {
    userId: number;
    role: string;
  };
}

export default function BuyerDashboard() {
  const router = useRouter();
  const [data, setData] = useState<BuyerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      router.push("/login");
      return;
    }

    apiRequest<BuyerResponse>("/api/dashboard/buyer", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(setData)
      .catch((err) => {
        setError(err?.message || "Failed to load buyer dashboard");
        setTimeout(() => router.push("/login"), 1200);
      });
  }, [router]);

  return (
    <div style={pageWrap}>
      <div style={headerRow}>
        <div>
          <div style={kicker}>
            <span style={dot} />
            Buyer Dashboard
          </div>
          <h1 style={title}>Welcome back</h1>
          <p style={subtitle}>Track your saved properties and manage your preferences.</p>
        </div>

        <div style={actions}>
          <button onClick={() => router.push("/dashboard/buyer/properties")
} style={primaryBtn}>
            Browse Properties
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              router.push("/");
            }}
            style={ghostBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div style={grid}>
        <div style={statCard}>
          <div style={statLabel}>Saved Properties</div>
          <div style={statValue}>—</div>
          <div style={statHint}>Coming soon</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Recommendations</div>
          <div style={statValue}>—</div>
          <div style={statHint}>Coming soon</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Alerts</div>
          <div style={statValue}>—</div>
          <div style={statHint}>Coming soon</div>
        </div>
      </div>

      {/* Main Panel */}
      <div style={panel}>
        <div style={panelHeader}>
          <div>
            <div style={panelTitle}>Account Status</div>
            <div style={panelSub}>Your session and role details.</div>
          </div>

          <div style={pill}>
            <span style={pillDot} />
            {data ? "Connected" : error ? "Error" : "Loading"}
          </div>
        </div>

        {error && (
          <div style={alert("error")}>
            <strong style={{ fontWeight: 900 }}>Error:</strong> {error}
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
              Redirecting to login...
            </div>
          </div>
        )}

        {!error && !data && (
          <div style={loadingWrap}>
            <div style={spinner} />
            <div>
              <div style={{ fontWeight: 900, color: "#2b221b" }}>Loading dashboard...</div>
              <div style={{ fontSize: 13, color: "rgba(27,27,27,.62)", marginTop: 4 }}>
                Fetching your buyer profile.
              </div>
            </div>
          </div>
        )}

        {data && (
          <div style={infoCard}>
            <div style={infoRow}>
              <div style={infoKey}>Message</div>
              <div style={infoVal}>{data.message}</div>
            </div>

            <div style={divider} />

            <div style={infoRow}>
              <div style={infoKey}>User ID</div>
              <div style={infoVal}>{data.user.userId}</div>
            </div>

            <div style={infoRow}>
              <div style={infoKey}>Role</div>
              <div style={roleBadge}>{data.user.role}</div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/* =========================
   LuxeHaven styles
========================= */
const pageWrap: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "26px 14px 60px",
};

const headerRow: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  padding: "18px 18px 14px",
  borderRadius: 22,
  border: "1px solid rgba(176,122,82,.14)",
  background: "linear-gradient(180deg, rgba(255,255,255,.75) 0%, rgba(247,241,234,.55) 100%)",
  boxShadow: "0 18px 50px rgba(176,122,82,.12)",
};

const kicker: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,.65)",
  border: "1px solid rgba(176,122,82,.16)",
  color: "#4a3c2d",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

const dot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 99,
  background: "linear-gradient(135deg, #b07a52, #9a6643)",
  boxShadow: "0 0 0 6px rgba(176,122,82,.12)",
};

const title: React.CSSProperties = {
  marginTop: 12,
  fontSize: 34,
  fontWeight: 950,
  letterSpacing: "-0.02em",
  color: "#1b1b1b",
  lineHeight: 1.1,
};

const subtitle: React.CSSProperties = {
  marginTop: 10,
  fontSize: 14,
  lineHeight: 1.6,
  color: "rgba(27,27,27,.65)",
  maxWidth: 520,
};

const actions: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "flex-end",
};

const primaryBtn: React.CSSProperties = {
  border: "none",
  borderRadius: 999,
  padding: "12px 16px",
  fontSize: 13,
  fontWeight: 950,
  color: "#fff",
  cursor: "pointer",
  background: "linear-gradient(135deg, #b07a52 0%, #9a6643 100%)",
  boxShadow: "0 10px 25px rgba(176,122,82,.22)",
};

const ghostBtn: React.CSSProperties = {
  border: "1px solid rgba(176,122,82,.22)",
  borderRadius: 999,
  padding: "12px 14px",
  fontSize: 13,
  fontWeight: 950,
  cursor: "pointer",
  background: "rgba(255,255,255,.8)",
  color: "#9a6643",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
  marginTop: 14,
};

const statCard: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(176,122,82,.14)",
  background: "rgba(255,255,255,.78)",
  padding: "16px 16px",
  boxShadow: "0 14px 34px rgba(0,0,0,.05)",
};

const statLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  color: "rgba(27,27,27,.55)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const statValue: React.CSSProperties = {
  marginTop: 10,
  fontSize: 30,
  fontWeight: 950,
  color: "#1b1b1b",
};

const statHint: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: "rgba(154,102,67,.9)",
  fontWeight: 800,
};

const panel: React.CSSProperties = {
  marginTop: 14,
  borderRadius: 22,
  border: "1px solid rgba(176,122,82,.14)",
  background: "rgba(255,255,255,.78)",
  padding: 16,
  boxShadow: "0 18px 55px rgba(176,122,82,.12)",
};

const panelHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 12,
};

const panelTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 950,
  color: "#1b1b1b",
};

const panelSub: React.CSSProperties = {
  marginTop: 4,
  fontSize: 13,
  color: "rgba(27,27,27,.62)",
};

const pill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid rgba(176,122,82,.16)",
  background: "rgba(247,241,234,.65)",
  color: "#4a3c2d",
  fontSize: 12,
  fontWeight: 900,
};

const pillDot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 99,
  background: "linear-gradient(135deg, #b07a52, #9a6643)",
};

const loadingWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  borderRadius: 16,
  border: "1px solid rgba(176,122,82,.12)",
  background: "rgba(251,247,242,.9)",
  padding: 14,
};

const spinner: React.CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: 999,
  border: "2px solid rgba(176,122,82,.25)",
  borderTopColor: "#b07a52",
  animation: "spin 1s linear infinite",
};

const infoCard: React.CSSProperties = {
  borderRadius: 16,
  border: "1px solid rgba(176,122,82,.12)",
  background: "rgba(251,247,242,.9)",
  padding: 14,
};

const infoRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 6px",
  flexWrap: "wrap",
};

const infoKey: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 950,
  color: "rgba(27,27,27,.55)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const infoVal: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "#1b1b1b",
};

const divider: React.CSSProperties = {
  height: 1,
  background: "rgba(176,122,82,.18)",
  margin: "6px 0",
};

const roleBadge: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "linear-gradient(135deg, rgba(176,122,82,.22), rgba(154,102,67,.12))",
  border: "1px solid rgba(176,122,82,.22)",
  fontSize: 12,
  fontWeight: 950,
  color: "#4a3c2d",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

function alert(kind: "error" | "success"): React.CSSProperties {
  if (kind === "error") {
    return {
      marginTop: 8,
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
    marginTop: 8,
    padding: "12px 12px",
    borderRadius: 14,
    background: "rgba(34, 197, 94, .12)",
    border: "1px solid rgba(34, 197, 94, .25)",
    color: "#14532d",
    fontSize: 13,
    lineHeight: 1.5,
  };
}
