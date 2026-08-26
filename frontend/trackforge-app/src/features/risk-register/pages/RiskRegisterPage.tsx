import { useState } from "react";
import { AlertTriangle, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function RiskRegisterPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "r-1", name: "High risk", level: "High" },
    { id: "r-2", name: "Budget overrrun", level: "Medium" },
  ]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Low");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `r-${Date.now()}`, name, level }]);
    setName("");
    setShow(false);
    notify("Risk added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Risk register</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New risk
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Risk name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-slate-400" />
              <div className="font-medium text-slate-900">{i.name}</div>
            </div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.level === "High" ? "bg-red-100 text-red-700" : i.level === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{i.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
