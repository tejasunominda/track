import { useState } from "react";
import { Package, Plus, Rocket, Trash2, Search, Calendar } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Release { id: string; name: string; date: string; status: "Planned" | "In Progress" | "Shipped"; }

const sColor = { Planned: "bg-blue-100 text-blue-700", "In Progress": "bg-amber-100 text-amber-700", Shipped: "bg-green-100 text-green-700" };
const sGradient = { Planned: "from-blue-500 to-indigo-600", "In Progress": "from-amber-500 to-orange-500", Shipped: "from-green-500 to-emerald-600" };

export function ReleasesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Release[]>([
    { id: "r-1", name: "v1.0.0", date: "2025-01-15", status: "Shipped" },
    { id: "r-2", name: "v1.1.0", date: "2025-03-01", status: "Shipped" },
    { id: "r-3", name: "v1.2.0", date: "2025-04-15", status: "In Progress" },
    { id: "r-4", name: "v2.0.0", date: "2025-06-01", status: "Planned" },
  ]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `r-${Date.now()}`, name, date: date || "TBD", status: "Planned" }]); setName(""); setDate(""); setShow(false); notify("Release created"); };
  const remove = (id: string) => { setItems((p) => p.filter((r) => r.id !== id)); notify("Release removed"); };

  const filtered = items.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date));
  const stats = { total: items.length, shipped: items.filter((r) => r.status === "Shipped").length, planned: items.filter((r) => r.status === "Planned").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Releases</h1><p className="text-sm text-slate-500">{stats.total} releases · {stats.shipped} shipped · {stats.planned} planned</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New release</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Release name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search releases..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="relative pl-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200">
        {filtered.map((r) => (
          <div key={r.id} className="group relative mb-3">
            <span className={`absolute -left-4 top-3 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br ${sGradient[r.status]} ring-4 ring-slate-50`} />
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[r.status]} text-white shadow-md`}><Package className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{r.name}</span><span className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" /> {r.date}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[r.status]}`}>{r.status === "Shipped" && <Rocket className="h-3 w-3" />}{r.status}</span>
                <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
