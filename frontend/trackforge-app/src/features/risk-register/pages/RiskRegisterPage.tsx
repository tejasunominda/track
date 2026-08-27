import { useState } from "react";
import { AlertTriangle, Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Risk { id: string; name: string; level: "Low" | "Medium" | "High"; mitigation: string; }

const lColor = { Low: "bg-green-100 text-green-700", Medium: "bg-amber-100 text-amber-700", High: "bg-red-100 text-red-700" };
const lGradient = { Low: "from-green-500 to-emerald-600", Medium: "from-amber-500 to-orange-500", High: "from-red-500 to-rose-600" };

export function RiskRegisterPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Risk[]>([
    { id: "r-1", name: "High risk", level: "High", mitigation: "Mitigate with redundancy" },
    { id: "r-2", name: "Budget overrrun", level: "Medium", mitigation: "Track weekly spend" },
    { id: "r-3", name: "Key person dependency", level: "Medium", mitigation: "Cross-train team" },
    { id: "r-4", name: "Minor delay", level: "Low", mitigation: "Buffer in schedule" },
  ]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Risk["level"]>("Low");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `r-${Date.now()}`, name, level, mitigation: "TBD" }]); setName(""); setShow(false); notify("Risk added"); };
  const remove = (id: string) => { setItems((p) => p.filter((r) => r.id !== id)); notify("Risk removed"); };

  const filtered = items.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { high: items.filter((r) => r.level === "High").length, medium: items.filter((r) => r.level === "Medium").length, low: items.filter((r) => r.level === "Low").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Risk register</h1><p className="text-sm text-slate-500">{items.length} risks · {stats.high} high · {stats.medium} medium · {stats.low} low</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New risk</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Risk name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={level} onChange={(e) => setLevel(e.target.value as Risk["level"])} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Low</option><option>Medium</option><option>High</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search risks..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <div key={r.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${lGradient[r.level]} text-white shadow-md`}><AlertTriangle className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${lColor[r.level]}`}>{r.level}</span>
                <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{r.name}</div>
            <div className="mt-1 text-xs text-slate-400">Mitigation: {r.mitigation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
