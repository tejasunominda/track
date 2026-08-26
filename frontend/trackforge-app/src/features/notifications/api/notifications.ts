import { apiFetch } from "@/api/client";

export interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
}

export async function listNotifications(): Promise<Notification[]> {
  return apiFetch<Notification[]>("/notifications");
}

export async function markRead(id: string): Promise<Notification> {
  return apiFetch<Notification>(`/notifications/${id}/read`, { method: "POST" });
}

export async function markAllRead(): Promise<void> {
  return apiFetch<void>("/notifications/read-all", { method: "POST" });
}
