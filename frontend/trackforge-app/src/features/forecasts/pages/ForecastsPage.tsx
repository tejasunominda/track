import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Trash2, BarChart3 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Forecast { id: string; name: string; value: number; unit: string; period: string; trend: number; }

export function ForecastsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Forecast[]>([
    { id: "f-1", name: "Revenue", value: 1200000, unit: "$", period: "Q1 2025", trend: 12 },
    { id: "f-2", name: "Active users", value: 5000, unit: "", period: "Q1 2025", trend: 8 },
    { id: "f-3", name: "Churn rate", value: 320, unit: "%", period: "Q1 2025", trend: -3 },
    { id: "f-4", name: "New signups", value: 1200, unit: "", period: "Q1 2025", trend: 15 },
  ]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [period, setPeriod] = useState("Q1 2025");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !value.trim()) return; setItems((p) => [...p, { id: `f-${Date.now()}`, name, value: parseInt(value), unit: "", period, trend: 0 }]); setName(""); setValue(""); setShow(false); notify("Forecast added"); };
  const remove = (id: string) => { setItems((p) => p.filter((f) => f.id !== id)); notify("Forecast removed"); };
  const maxVal = Math.max(...items.map((i) => i.value));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Forecasts</h1><p className="text-sm text-slate-500">{items.length} forecasts · {items.filter((i) => i.trend > 0).length} trending up</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New forecast</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Forecast name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Q1 2025</option><option>Q2 2025</option><option>Q3 2025</option><option>Q4 2025</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {items.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><BarChart3 className="h-4 w-4" /></div><div><div className="font-bold text-slate-900">{i.name}</div><div className="text-xs text-slate-400">{i.period}</div></div></div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${i.trend > 0 ? "bg-green-100 text-green-700" : i.trend < 0 ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500"}`}>{i.trend > 0 ? <TrendingUp className="h-3 w-3" /> : i.trend < 0 ? <TrendingDown className="h-3 w-3" /> : null}{i.trend > 0 ? "+" : ""}{i.trend}%</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mb-3 text-3xl font-bold text-slate-900">{i.unit === "$" ? "$" : ""}{i.value.toLocaleString()}{i.unit && i.unit !== "$" ? i.unit : ""}</div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500" style={{ width: `${(i.value / maxVal) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
