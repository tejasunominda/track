import { useState } from "react";
import { Briefcase, Plus, TrendingUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function DealsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "d-1", name: "Enterprise renewal", value: 250000, status: "Negotiation" },
    { id: "d-2", name: "Startup pilot", value: 12000, status: "Won" },
  ]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const total = items.reduce((s, i) => s + i.value, 0);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;
    setItems((prev) => [...prev, { id: `d-${Date.now()}`, name, value: parseInt(value), status: "Open" }]);
    setName("");
    setValue("");
    setShow(false);
    notify("Deal created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deals</h1>
          <p className="text-sm text-slate-500">Total: ${total.toLocaleString()}</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Deal name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.status}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-slate-700"><TrendingUp className="h-3.5 w-3.5" /> ${i.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
