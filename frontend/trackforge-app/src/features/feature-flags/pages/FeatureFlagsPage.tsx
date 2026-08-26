import { useState } from "react";
import { Flag, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function FeatureFlagsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "ff-1", name: "Enabled", on: true },
    { id: "ff-2", name: "Dark mode", on: false },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `ff-${Date.now()}`, name, on: false }]);
    setName("");
    setShow(false);
    notify("Flag added");
  };

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, on: !i.on } : i)));
    notify("Flag toggled");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Feature flags</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Flag name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Flag className={`h-5 w-5 ${i.on ? "text-green-500" : "text-slate-400"}`} />
              <div className="font-medium text-slate-900">{i.name}</div>
            </div>
            <button onClick={() => toggle(i.id)} className={`rounded-full px-3 py-1 text-xs font-bold text-white transition-all duration-150 ${i.on ? "bg-green-500 hover:bg-green-600" : "bg-slate-400 hover:bg-slate-500"}`}>{i.on ? "ON" : "OFF"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
