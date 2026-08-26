const logs = [
  { id: "l-1", actor: "u-1", action: "CREATE", entity: "Issue" },
  { id: "l-2", actor: "u-2", action: "UPDATE", entity: "Issue" },
  { id: "l-3", actor: "u-1", action: "START", entity: "Sprint" },
];

export function AuditLogPage() {
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Audit log</h1>
      <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">Download full log as CSV from /api/v1/admin/audit-log/export</div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {logs.map((l) => (
          <div key={l.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="text-sm text-slate-800">{l.action} {l.entity}</div>
            <div className="text-xs text-slate-500">by {l.actor}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
