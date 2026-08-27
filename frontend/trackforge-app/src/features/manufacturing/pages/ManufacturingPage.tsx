import { useState } from "react";
import { Factory, Plus, Trash2, Search, Play, Activity } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Workstation { id: string; name: string; status: "Running" | "Idle" | "Maintenance"; output: number; }

const sColor = { Running: "bg-green-100 text-green-700", Idle: "bg-slate-100 text-slate-600", Maintenance: "bg-amber-100 text-amber-700" };
const sGradient = { Running: "from-green-500 to-emerald-600", Idle: "from-slate-400 to-slate-600", Maintenance: "from-amber-500 to-orange-500" };

export function ManufacturingPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Workstation[]>([
    { id: "mfg-1", name: "Assembly A", status: "Running", output: 120 },
    { id: "mfg-2", name: "Assembly B", status: "Idle", output: 0 },
    { id: "mfg-3", name: "QC Station", status: "Maintenance", output: 45 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `mfg-${Date.now()}`, name, status: "Idle", output: 0 }]); setName(""); setShow(false); notify("Workstation added"); };
  const start = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Running" } : i)); notify("Workstation started"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Workstation removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, running: items.filter((i) => i.status === "Running").length, totalOutput: items.reduce((s, i) => s + i.output, 0) };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Manufacturing</h1><p className="text-sm text-slate-500">{stats.total} stations · {stats.running} running · {stats.totalOutput} output</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New line</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Workstation name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workstations..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[i.status]} text-white shadow-md`}><Factory className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Activity className="h-3 w-3" /> {i.status}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-1 text-xs text-slate-400">Output: {i.output} units</div>
            {i.status !== "Running" && <button onClick={() => start(i.id)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-green-100 py-1.5 text-xs font-bold text-green-700 transition-all hover:bg-green-200"><Play className="h-3 w-3" /> Start</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
