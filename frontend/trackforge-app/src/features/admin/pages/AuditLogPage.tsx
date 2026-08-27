import { useEffect, useState } from "react";
import { listAuditLogs, AuditLog } from "@/features/admin/api/audit";
import { Search, Download, Shield, ChevronDown, ChevronRight, Filter } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const actionColor: Record<string, string> = { CREATE: "bg-green-100 text-green-700", UPDATE: "bg-blue-100 text-blue-700", DELETE: "bg-red-100 text-red-700", LOGIN: "bg-purple-100 text-purple-700", LOGOUT: "bg-slate-100 text-slate-600" };

export function AuditLogPage() {
  const { notify } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setLoading(true); listAuditLogs().then((d) => { setLogs(d); setLoading(false); }).catch(console.error); }, []);

  const actions = ["All", "CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT"];
  const filtered = logs.filter((l) => (actionFilter === "All" || l.action === actionFilter) && (l.description.toLowerCase().includes(search.toLowerCase()) || l.userName.toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase())));
  const stats = { total: logs.length, creates: logs.filter((l) => l.action === "CREATE").length, deletes: logs.filter((l) => l.action === "DELETE").length };

  const toggle = (id: string) => setExpanded((p) => p === id ? null : id);
  const download = () => notify("Audit log exported");

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Audit log</h1><p className="text-sm text-slate-500">Track important changes across the workspace.</p></div>
        <button onClick={download} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Download className="h-4 w-4" /> Download full log</button>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[{ label: "Total events", val: stats.total, color: "from-blue-500 to-indigo-600" }, { label: "Creates", val: stats.creates, color: "from-green-500 to-emerald-600" }, { label: "Deletes", val: stats.deletes, color: "from-red-500 to-rose-600" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><Shield className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audit log..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Filter className="h-3.5 w-3.5" /></span>
        {actions.map((a) => <button key={a} onClick={() => setActionFilter(a)} className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${actionFilter === a ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{a}</button>)}
      </div>
      {loading ? <div className="p-6 text-slate-500">Loading audit log…</div> : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {filtered.map((l) => (
            <div key={l.id} className="border-b border-slate-100">
              <button onClick={() => toggle(l.id)} className="flex w-full items-center justify-between p-4 text-left transition-all hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  {expanded === l.id ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${actionColor[l.action] ?? "bg-slate-100 text-slate-600"}`}>{l.action}</span>
                      <span className="text-sm font-medium text-slate-900">{l.description}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">by {l.userName} · {l.targetType} {l.target}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{new Date(l.occurredAt).toLocaleString()}</div>
              </button>
              {expanded === l.id && <div className="bg-slate-50 px-4 py-3 text-sm text-slate-600"><pre className="whitespace-pre-wrap font-mono text-xs">{JSON.stringify(l, null, 2)}</pre></div>}
            </div>
          ))}
          {filtered.length === 0 && <div className="p-6 text-center text-slate-400">No audit entries found</div>}
        </div>
      )}
    </div>
  );
}
