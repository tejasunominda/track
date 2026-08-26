import { apiFetch } from "@/api/client";

export interface SavedFilter {
  id: string;
  name: string;
  query: string;
}

export function listFilters(): Promise<SavedFilter[]> {
  return apiFetch("/search/filters");
}

export function createFilter(name: string, query: string): Promise<SavedFilter> {
  return apiFetch("/search/filters", { method: "POST", body: JSON.stringify({ name, query }) });
}

export function updateFilter(id: string, name: string, query: string): Promise<SavedFilter> {
  return apiFetch(`/search/filters/${id}`, { method: "PUT", body: JSON.stringify({ name, query }) });
}

export function deleteFilter(id: string): Promise<void> {
  return apiFetch(`/search/filters/${id}`, { method: "DELETE" });
}
