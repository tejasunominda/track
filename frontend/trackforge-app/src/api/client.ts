import { useAuthStore } from "@/features/auth/store";
import { mockFetch } from "@/mocks/mockApi";

/**
 * Base fetch wrapper used by feature API modules. Bearer token is attached
 * from the auth store. Generated client hook reserved for F10-02.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (USE_MOCK) {
    const mock = await mockFetch(`${API_BASE_URL}${path}`, init);
    if (mock?.status && mock.status >= 400) {
      throw new Error(mock.error?.message ?? `Request failed: ${mock.status}`);
    }
    return mock as T;
  }

  const token = useAuthStore.getState().accessToken;
  const isFormData = init?.body instanceof FormData;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
