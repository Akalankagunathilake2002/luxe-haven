import { apiAuthRequest } from "./api";

export interface UsersByRoleRow {
  role: string;
  count: number;
}

export interface PropertiesByStatusRow {
  status: string;
  count: number;
}

export interface AdminOverviewStats {
  totalUsers: number;
  usersByRole: UsersByRoleRow[];
  totalProperties: number;
  propertiesByStatus: PropertiesByStatusRow[];
}

export interface AdminPropertyRow {
  id: number;
  title: string;
  description: string | null;
  price: number;
  location: string;
  status: string;
  created_at: string;
  seller_id: number;
  seller_name: string;
  seller_email: string;
}

export function fetchAdminOverview(token: string) {
  return apiAuthRequest<AdminOverviewStats>("/api/admin/stats/overview", token);
}

export function fetchAdminProperties(token: string) {
  return apiAuthRequest<AdminPropertyRow[]>("/api/admin/properties", token);
}

export function updateAdminPropertyStatus(
  token: string,
  id: number,
  status: string
) {
  return apiAuthRequest<{ message: string; property: any }>(
    `/api/admin/properties/${id}/status`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );
}
