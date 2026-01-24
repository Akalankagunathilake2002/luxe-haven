"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { apiAuthRequest } from "@/lib/api";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type UsersByRoleRow = { role: string; count: number };
type PropertiesByStatusRow = { status: string; count: number };

type AdminOverview = {
  totalUsers: number;
  usersByRole: UsersByRoleRow[];
  totalProperties: number;
  propertiesByStatus: PropertiesByStatusRow[];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return router.push("/");

    apiAuthRequest<AdminOverview>("/api/admin/stats/overview", token)
      .then(setStats)
      .catch((e: any) => setError(e.message || "Failed to load admin stats"));
  }, [router]);

  // ✅ FIX: map to plain objects so Recharts TS doesn't complain
  const statusData = useMemo(
    () => (stats?.propertiesByStatus ?? []).map((s) => ({ status: s.status, count: s.count })),
    [stats]
  );

  const roleData = useMemo(
    () => (stats?.usersByRole ?? []).map((u) => ({ role: u.role, count: u.count })),
    [stats]
  );

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Admin Dashboard</h2>

      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
      {!error && !stats && <p>Loading...</p>}

      {stats && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Card title="Total Users" value={stats.totalUsers} />
            <Card title="Total Properties" value={stats.totalProperties} />
          </div>

          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={panel}>
              <h3 style={panelTitle}>Users by Role</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={roleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={panel}>
              <h3 style={panelTitle}>Properties by Status</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={statusData} dataKey="count" nameKey="status" outerRadius={90} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div style={panel}>
      <p style={{ margin: 0, opacity: 0.8 }}>{title}</p>
      <p style={{ margin: "0.35rem 0 0", fontSize: "1.6rem", fontWeight: 800 }}>{value}</p>
    </div>
  );
}

const panel = {
  padding: "1rem",
  borderRadius: "0.9rem",
  border: "1px solid #1f2937",
  background: "#020617",
} as const;

const panelTitle = {
  margin: 0,
  marginBottom: "0.75rem",
  fontSize: "1rem",
  fontWeight: 800,
} as const;
