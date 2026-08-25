import { apiFetch } from "@/api/client";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export interface LoginRequest {
  subdomain: string;
  email: string;
  password: string;
  deviceFingerprint: string | null;
}

export function login(req: LoginRequest): Promise<AuthResponse> {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
