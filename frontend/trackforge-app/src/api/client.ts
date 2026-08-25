/**
 * Base fetch wrapper used by the auto-generated OpenAPI TypeScript client
 * (see Frontend Specification Document §8 — never hand-write fetch calls
 * for backend resources; run `npm run generate:api-client` once the backend
 * publishes its OpenAPI spec, per Feature Ticket [F10-02]).
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
