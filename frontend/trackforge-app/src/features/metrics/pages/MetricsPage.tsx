import { useState } from "react";
import { Activity, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function MetricsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "mt-1", name: "CPU usage", value: 45, unit: "%" },
    { id: "mt-2", name: "Latency", value: 120, unit: "ms" },
  ]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;
    setItems((prev) => [...prev, { id: `mt-${Date.now()}`, name, value: parseInt(value), unit }]);
    setName("");
    setValue("");
    setUnit("");
    setShow(false);
    notify("Metric added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Metrics</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New metric
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Metric name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-500"><Activity className="h-4 w-4" /> {i.name}</div>
            <div className="text-3xl font-bold text-slate-900">{i.value}<span className="ml-1 text-sm font-medium text-slate-500">{i.unit}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
