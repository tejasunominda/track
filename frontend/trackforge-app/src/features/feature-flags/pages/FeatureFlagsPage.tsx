import { useState } from "react";
import { Flag, Plus, Search, Trash2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface FeatureFlag { id: string; name: string; on: boolean; env: string; description: string; }

export function FeatureFlagsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<FeatureFlag[]>([
    { id: "ff-1", name: "Enabled", on: true, env: "Production", description: "Master feature toggle" },
    { id: "ff-2", name: "Dark mode", on: false, env: "Staging", description: "UI theme switcher" },
    { id: "ff-3", name: "Beta features", on: true, env: "Development", description: "Early access features" },
    { id: "ff-4", name: "New dashboard", on: false, env: "Production", description: "Redesigned analytics view" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [envFilter, setEnvFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `ff-${Date.now()}`, name, on: false, env: "Development", description: "New feature flag" }]); setName(""); setShow(false); notify("Flag added"); };
  const toggle = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, on: !i.on } : i)); notify("Flag toggled"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Flag removed"); };

  const envs = ["All", "Production", "Staging", "Development"];
  const filtered = items.filter((i) => (envFilter === "All" || i.env === envFilter) && i.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, on: items.filter((i) => i.on).length, off: items.filter((i) => !i.on).length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Feature flags</h1><p className="text-sm text-slate-500">{stats.on} enabled · {stats.off} disabled</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Flag name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search flags..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {envs.map((e) => <button key={e} onClick={() => setEnvFilter(e)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${envFilter === e ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{e}</button>)}
      </div>
      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.on ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><Flag className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.name}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${i.env === "Production" ? "bg-red-100 text-red-700" : i.env === "Staging" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{i.env}</span></div>
                <div className="mt-0.5 text-xs text-slate-400">{i.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggle(i.id)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white transition-all ${i.on ? "bg-green-500 hover:bg-green-600" : "bg-slate-400 hover:bg-slate-500"}`}>{i.on ? "ON" : "OFF"}<div className={`relative h-4 w-7 rounded-full ${i.on ? "bg-white/30" : "bg-white/30"}`}><div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${i.on ? "left-3.5" : "left-0.5"}`} /></div></button>
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
