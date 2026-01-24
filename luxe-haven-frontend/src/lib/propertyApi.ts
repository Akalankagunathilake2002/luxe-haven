// src/lib/propertyApi.ts
import { apiRequest, apiAuthRequest } from "@/lib/api";

// ✅ Type your components expect
export type Property = {
  id: number;
  seller_id: number;
  title: string;
  description: string | null;
  price: string;       // NUMERIC usually comes as string
  location: string;
  status: string;
  created_at: string;
};

// ✅ keep my previous name too (compat)
export type PropertyRow = Property;

// -------------------- PUBLIC --------------------

// GET /api/properties
export async function fetchAllProperties(): Promise<Property[]> {
  return apiRequest<Property[]>("/api/properties");
}

// GET /api/properties/:id
export async function fetchPropertyById(id: string | number): Promise<Property> {
  return apiRequest<Property>(`/api/properties/${id}`);
}

// ✅ alias for older imports
export const getPropertyById = fetchPropertyById;

// -------------------- SELLER --------------------

// GET /api/properties/mine
export async function fetchMyProperties(token: string): Promise<Property[]> {
  return apiAuthRequest<Property[]>("/api/properties/mine", token);
}

// ✅ alias for older imports
export const getMyProperties = fetchMyProperties;

// POST /api/properties
export async function createProperty(
  token: string,
  payload: { title: string; description?: string; price: number; location: string }
): Promise<Property> {
  return apiAuthRequest<Property>("/api/properties", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// PUT /api/properties/:id
export async function updateProperty(
  token: string,
  id: string | number,
  payload: { title: string; description?: string | null; price: number; location: string; status?: string }
): Promise<Property> {
  return apiAuthRequest<Property>(`/api/properties/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// DELETE /api/properties/:id
export async function deleteProperty(token: string, id: string | number) {
  return apiAuthRequest<{ message: string }>(`/api/properties/${id}`, token, {
    method: "DELETE",
  });
}
