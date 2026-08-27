import { useState } from "react";
import { Plus, Server, Trash2, Search, Activity } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Env { id: string; name: string; status: "Healthy" | "Degraded"; url: string; }

const sColor = { Healthy: "bg-green-100 text-green-700", Degraded: "bg-amber-100 text-amber-700" };
const sGradient = { Healthy: "from-green-500 to-emerald-600", Degraded: "from-amber-500 to-orange-500" };

export function EnvironmentsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Env[]>([
    { id: "env-1", name: "Production", status: "Healthy", url: "api.trackforge.io" },
    { id: "env-2", name: "Staging", status: "Healthy", url: "staging.trackforge.io" },
    { id: "env-3", name: "Development", status: "Degraded", url: "dev.trackforge.io" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `env-${Date.now()}`, name, status: "Healthy", url: `${name.toLowerCase()}.trackforge.io` }]); setName(""); setShow(false); notify("Environment added"); };
  const toggle = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: i.status === "Healthy" ? "Degraded" : "Healthy" } : i)); notify("Environment toggled"); };
  const remove = (id: string) => { setItems((p) => p.filter((e) => e.id !== id)); notify("Environment removed"); };

  const filtered = items.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, healthy: items.filter((e) => e.status === "Healthy").length, degraded: items.filter((e) => e.status === "Degraded").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Environments</h1><p className="text-sm text-slate-500">{stats.total} envs · {stats.healthy} healthy · {stats.degraded} degraded</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New env</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Environment" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search environments..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <div key={e.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[e.status]} text-white shadow-md`}><Server className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[e.status]}`}><Activity className="h-3 w-3" /> {e.status}</span>
                <button onClick={() => remove(e.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{e.name}</div>
            <div className="mt-1 font-mono text-xs text-slate-400">{e.url}</div>
            <button onClick={() => toggle(e.id)} className="mt-3 w-full rounded-lg bg-slate-100 py-1.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-200">Toggle</button>
          </div>
        ))}
      </div>
    </div>
  );
}
