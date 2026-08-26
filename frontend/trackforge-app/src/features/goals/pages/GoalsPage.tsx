import { useState } from "react";
import { Flag, Plus, Target } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function GoalsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "g-1", name: "Q1 target", progress: 70 },
    { id: "g-2", name: "Reduce churn", progress: 45 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `g-${Date.now()}`, name, progress: 0 }]);
    setName("");
    setShow(false);
    notify("Goal created");
  };

  const bump = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, progress: Math.min(i.progress + 10, 100) } : i)));
    notify("Progress updated");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Goals</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New goal
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Goal name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900"><Target className="h-5 w-5 text-slate-400" /> {i.name}</div>
              <button onClick={() => bump(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                +10%
              </button>
            </div>
            <div className="mb-1 flex items-center gap-1 text-sm text-slate-500"><Flag className="h-3 w-3" /> {i.progress}%</div>
            <div className="h-2 w-full overflow-hidden rounded bg-slate-100">
              <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${i.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
