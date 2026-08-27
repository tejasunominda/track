import { useState } from "react";
import { History, Filter, Download, ArrowUp, ArrowDown, FileText } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface AuditEntry { id: string; user: string; action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN"; target: string; type: string; description: string; time: string; }

const ALL: AuditEntry[] = [
  { id: "a1", user: "Alice", action: "CREATE", target: "ENG-12", type: "issue", description: "Created issue", time: "2 min ago" },
  { id: "a2", user: "Bob", action: "UPDATE", target: "ENG-8", type: "issue", description: "Changed status to In Progress", time: "15 min ago" },
  { id: "a3", user: "Charlie", action: "DELETE", target: "MKT-3", type: "issue", description: "Deleted issue", time: "1 hour ago" },
  { id: "a4", user: "Alice", action: "LOGIN", target: "-", type: "auth", description: "Logged in from 192.168.1.10", time: "2 hours ago" },
  { id: "a5", user: "Bob", action: "UPDATE", target: "Sprint 2", type: "sprint", description: "Started sprint", time: "3 hours ago" },
  { id: "a6", user: "Dana", action: "CREATE", target: "DES-1", type: "issue", description: "Created design task", time: "5 hours ago" },
  { id: "a7", user: "Alice", action: "UPDATE", target: "ENG-12", type: "issue", description: "Added comment", time: "6 hours ago" },
  { id: "a8", user: "Bob", action: "DELETE", target: "Old backup", type: "system", description: "Removed old backup", time: "1 day ago" },
];

export function AuditTrailPage() {
  const { notify } = useToast();
  const [filter, setFilter] = useState<string>("ALL");
  const [user, setUser] = useState<string>("");
  const [entries] = useState<AuditEntry[]>(ALL);

  const filtered = entries.filter((e) => (filter === "ALL" || e.action === filter) && (!user || e.user.toLowerCase().includes(user.toLowerCase())));

  const aColor = { CREATE: "bg-green-100 text-green-700", UPDATE: "bg-blue-100 text-blue-700", DELETE: "bg-red-100 text-red-700", LOGIN: "bg-purple-100 text-purple-700" };
  const aIcon = { CREATE: ArrowUp, UPDATE: FileText, DELETE: ArrowDown, LOGIN: History };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit trail</h1>
          <p className="text-sm text-slate-500">{filtered.length} events</p>
        </div>
        <button onClick={() => notify("Audit log exported")} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <Filter className="h-4 w-4 text-slate-400" />
        {["ALL", "CREATE", "UPDATE", "DELETE", "LOGIN"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 ${filter === f ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{f}</button>
        ))}
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Filter by user..." className="ml-auto w-48 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
      </div>

      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {filtered.map((e) => {
          const Icon = aIcon[e.action];
          return (
            <div key={e.id} className="flex items-center gap-3 p-4 transition-all hover:bg-slate-50">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${aColor[e.action]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">{e.description}</div>
                <div className="text-xs text-slate-500">{e.user} · {e.type} · {e.target}</div>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${aColor[e.action]}`}>{e.action}</span>
              <span className="text-xs text-slate-400">{e.time}</span>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="p-8 text-center text-sm text-slate-400">No events match your filters</div>}
      </div>
    </div>
  );
}
