import { useState } from "react";
import { DollarSign, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function CostCentersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "cc-1", name: "Engineering", budget: 500000, spent: 350000 },
    { id: "cc-2", name: "Marketing", budget: 100000, spent: 40000 },
  ]);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !budget.trim()) return;
    setItems((prev) => [...prev, { id: `cc-${Date.now()}`, name, budget: parseInt(budget), spent: 0 }]);
    setName("");
    setBudget("");
    setShow(false);
    notify("Cost center added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Cost centers</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900"><DollarSign className="h-5 w-5 text-slate-400" /> {i.name}</div>
              <span className="text-sm text-slate-500">${i.spent.toLocaleString()} / ${i.budget.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded bg-slate-100">
              <div className={`h-full transition-all duration-300 ${i.spent / i.budget > 0.8 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${Math.min((i.spent / i.budget) * 100, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
