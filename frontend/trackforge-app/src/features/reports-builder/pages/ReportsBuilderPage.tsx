import { useState } from "react";
import { BarChart3, Plus, Trash2, Play, Download } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Report { id: string; name: string; source: string; groupBy: string; status: "Draft" | "Ready" | "Scheduled"; }

export function ReportsBuilderPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Report[]>([
    { id: "r-1", name: "Issues by status", source: "Issues", groupBy: "Status", status: "Ready" },
    { id: "r-2", name: "Velocity trend", source: "Sprints", groupBy: "Sprint", status: "Scheduled" },
    { id: "r-3", name: "Bug count by priority", source: "Issues", groupBy: "Priority", status: "Draft" },
  ]);
  const [name, setName] = useState("");
  const [source, setSource] = useState("Issues");
  const [groupBy, setGroupBy] = useState("Status");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `r-${Date.now()}`, name, source, groupBy, status: "Draft" }]);
    setName(""); setShow(false); notify("Report created");
  };
  const run = (id: string) => {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, status: "Ready" } : r)));
    notify("Report generated");
  };
  const remove = (id: string) => { setItems((p) => p.filter((r) => r.id !== id)); notify("Report deleted"); };

  const sColor = { Draft: "bg-slate-100 text-slate-600", Ready: "bg-green-100 text-green-700", Scheduled: "bg-blue-100 text-blue-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports builder</h1>
          <p className="text-sm text-slate-500">{items.length} reports</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New report
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Report name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={source} onChange={(e) => setSource(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Issues</option><option>Sprints</option><option>Users</option><option>Time</option>
          </select>
          <input value={groupBy} onChange={(e) => setGroupBy(e.target.value)} placeholder="Group by" className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-3">
        {items.map((r) => (
          <div key={r.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><BarChart3 className="h-5 w-5" /></div>
              <div>
                <div className="font-bold text-slate-900">{r.name}</div>
                <div className="text-xs text-slate-500">Source: {r.source} · Group by: {r.groupBy}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[r.status]}`}>{r.status}</span>
              <button onClick={() => run(r.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><Play className="h-3.5 w-3.5" /> Run</button>
              <button onClick={() => notify("Report exported")} className="rounded-lg bg-slate-100 p-1.5 text-slate-600 transition-all hover:bg-slate-200"><Download className="h-4 w-4" /></button>
              <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
