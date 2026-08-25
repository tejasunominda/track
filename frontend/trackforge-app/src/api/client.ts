import { useAuthStore } from "@/features/auth/store";

/**
 * Base fetch wrapper used by feature API modules. Bearer token is attached
 * from the auth store. Generated client hook reserved for F10-02.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
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
