"use client";

import React, { useEffect, useState } from "react";
import { fetchAllProperties, Property } from "@/lib/propertyApi";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function BuyerPropertiesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    fetchAllProperties()
      .then((data) => setItems(data))
      .catch((e) => setError(e?.message || "Failed to load properties"))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div style={pageWrap}>
      <div style={topBar}>
        <div>
          <div style={kicker}>
            <span style={dot} />
            Buyer • Properties
          </div>
          <h1 style={title}>Browse Listings</h1>
          <p style={subtitle}>Explore verified properties and open a listing to view more details.</p>
        </div>

        <div style={actions}>
          <button onClick={() => router.push("/dashboard/buyer")} style={ghostBtn}>
            ← Back to Dashboard
          </button>
          <button onClick={() => router.push("/properties")} style={primaryBtn}>
            Public Properties
          </button>
        </div>
      </div>

      {error && <div style={alert("error")}>{error}</div>}

      {!error && loading && (
        <div style={loadingBox}>
          <div style={spinner} />
          <div>
            <div style={{ fontWeight: 950, color: "#2b221b" }}>Loading properties...</div>
            <div style={{ fontSize: 13, color: "rgba(27,27,27,.62)", marginTop: 4 }}>
              Fetching the latest listings.
            </div>
          </div>
        </div>
      )}

      {!error && !loading && items.length === 0 && (
        <div style={emptyCard}>
          <div style={{ fontWeight: 950, fontSize: 16, color: "#2b221b" }}>No listings yet</div>
          <div style={{ marginTop: 6, color: "rgba(27,27,27,.62)", fontSize: 13 }}>
            Check back later or browse public properties.
          </div>
          <button onClick={() => router.push("/properties")} style={{ ...primaryBtn, marginTop: 14 }}>
            Browse Public Properties
          </button>
        </div>
      )}

      {!error && !loading && items.length > 0 && (
        <div style={grid}>
          {items.map((p) => (
            <div key={p.id} style={card}>
              <div style={cardTop}>
                <div>
                  <div style={cardTitle}>{p.title}</div>
                  <div style={meta}>
                    {p.location} •{" "}
                    <span style={{ fontWeight: 950, color: "#2b221b" }}>
                      LKR {Number(p.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style={statusPill}>
                  <span style={pillDot} />
                  {p.status}
                </div>
              </div>

              {p.description && <div style={desc}>{p.description}</div>}

              <div style={cardActions}>
                <button
                  onClick={() => router.push(`/dashboard/buyer/properties/${p.id}`)}
                  style={primaryBtn}
                >
                  View details →
                </button>
                <button
                  onClick={() => alert("error")}
                  style={outlineBtn}
                >
                  Buy / Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 900px) {
          .__grid {
            grid-template-columns: 1fr !important;
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

const topBar: React.CSSProperties = {
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
  maxWidth: 560,
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

const outlineBtn: React.CSSProperties = {
  border: "1px solid rgba(176,122,82,.25)",
  borderRadius: 999,
  padding: "12px 14px",
  fontSize: 13,
  fontWeight: 950,
  cursor: "pointer",
  background: "rgba(251,247,242,.9)",
  color: "#4a3c2d",
};

const loadingBox: React.CSSProperties = {
  marginTop: 14,
  display: "flex",
  alignItems: "center",
  gap: 12,
  borderRadius: 18,
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

const grid: React.CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
} as React.CSSProperties;

const card: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(176,122,82,.14)",
  background: "rgba(255,255,255,.78)",
  padding: 16,
  boxShadow: "0 14px 34px rgba(0,0,0,.05)",
};

const cardTop: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const cardTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 950,
  color: "#1b1b1b",
};

const meta: React.CSSProperties = {
  marginTop: 6,
  fontSize: 13,
  color: "rgba(27,27,27,.65)",
};

const statusPill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid rgba(176,122,82,.16)",
  background: "rgba(247,241,234,.65)",
  color: "#4a3c2d",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.10em",
};

const pillDot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 99,
  background: "linear-gradient(135deg, #b07a52, #9a6643)",
};

const desc: React.CSSProperties = {
  marginTop: 12,
  fontSize: 13,
  color: "rgba(27,27,27,.72)",
  lineHeight: 1.6,
};

const cardActions: React.CSSProperties = {
  display: "flex",
  gap: 10,
  marginTop: 14,
  flexWrap: "wrap",
};

const emptyCard: React.CSSProperties = {
  marginTop: 14,
  borderRadius: 22,
  border: "1px solid rgba(176,122,82,.14)",
  background: "rgba(255,255,255,.78)",
  padding: 18,
  boxShadow: "0 14px 34px rgba(0,0,0,.05)",
};

function alert(kind: "error" | "success"): React.CSSProperties {
  if (kind === "error") {
    return {
      marginTop: 14,
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
    marginTop: 14,
    padding: "12px 12px",
    borderRadius: 14,
    background: "rgba(34, 197, 94, .12)",
    border: "1px solid rgba(34, 197, 94, .25)",
    color: "#14532d",
    fontSize: 13,
    lineHeight: 1.5,
  };
}
