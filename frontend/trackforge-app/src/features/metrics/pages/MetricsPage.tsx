import { useState } from "react";
import { Activity, Plus, Trash2, Search, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Metric { id: string; name: string; value: number; unit: string; threshold: number; trend: number; }

export function MetricsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Metric[]>([
    { id: "mt-1", name: "CPU usage", value: 45, unit: "%", threshold: 80, trend: 5 },
    { id: "mt-2", name: "Latency", value: 120, unit: "ms", threshold: 200, trend: -8 },
    { id: "mt-3", name: "Error rate", value: 0.5, unit: "%", threshold: 1, trend: 2 },
    { id: "mt-4", name: "Memory", value: 62, unit: "%", threshold: 85, trend: 3 },
    { id: "mt-5", name: "Throughput", value: 1500, unit: "req/s", threshold: 2000, trend: 12 },
  ]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !value.trim()) return; setItems((p) => [...p, { id: `mt-${Date.now()}`, name, value: parseFloat(value), unit, threshold: 100, trend: 0 }]); setName(""); setValue(""); setUnit(""); setShow(false); notify("Metric added"); };
  const remove = (id: string) => { setItems((p) => p.filter((m) => m.id !== id)); notify("Metric removed"); };

  const filtered = items.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
  const alerts = items.filter((m) => m.value >= m.threshold).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Metrics</h1><p className="text-sm text-slate-500">{items.length} metrics · {alerts} alerts</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New metric</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Metric name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search metrics..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => {
          const isAlert = m.value >= m.threshold;
          const pct = Math.min(100, (m.value / m.threshold) * 100);
          return (
            <div key={m.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-md ${isAlert ? "bg-gradient-to-br from-red-500 to-rose-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}><Activity className="h-4 w-4" /></div>
                <div className="flex items-center gap-2">
                  {isAlert && <span className="flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700"><AlertTriangle className="h-3 w-3" /> Alert</span>}
                  <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${m.trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{m.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{Math.abs(m.trend)}%</span>
                  <button onClick={() => remove(m.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mb-1 text-sm font-medium text-slate-500">{m.name}</div>
              <div className="mb-3 text-3xl font-bold text-slate-900">{m.value.toLocaleString()}<span className="ml-1 text-sm font-medium text-slate-500">{m.unit}</span></div>
              <div className="mb-1 flex items-center justify-between text-xs"><span className="text-slate-400">Threshold: {m.threshold}{m.unit}</span><span className={`font-bold ${isAlert ? "text-red-600" : "text-slate-500"}`}>{Math.round(pct)}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-500 ${isAlert ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
