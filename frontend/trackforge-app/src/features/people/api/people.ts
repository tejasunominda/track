import { apiFetch } from "@/api/client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function listUsers(): Promise<User[]> {
  return apiFetch<User[]>("/users");
}
