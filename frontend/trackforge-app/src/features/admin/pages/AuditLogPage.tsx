import { useEffect, useState } from "react";
import { listAuditLogs, AuditLog } from "@/features/admin/api/audit";

const actionColor: Record<string, string> = {
  CREATE: "bg-green-100 text-green-700",
  UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700",
};

export function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listAuditLogs()
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading audit log…</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit log</h1>
          <p className="text-sm text-slate-500">Track important changes across the workspace.</p>
        </div>
        <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50">
          Download full log
        </button>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {logs.map((l) => (
          <div key={l.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div>
              <div className="flex items-center gap-2 font-medium text-slate-900">
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${actionColor[l.action] ?? "bg-slate-100 text-slate-600"}`}>{l.action}</span>
                <span className="text-sm">{l.description}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">by {l.userName} · {l.targetType} {l.target}</div>
            </div>
            <div className="text-xs text-slate-400">{new Date(l.occurredAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
