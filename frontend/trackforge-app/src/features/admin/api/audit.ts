import { apiFetch } from "@/api/client";

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  targetType: string;
  description: string;
  occurredAt: string;
}

export async function listAuditLogs(): Promise<AuditLog[]> {
  return apiFetch<AuditLog[]>("/audit-logs");
}
