import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function GanttPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "t-1", name: "Design", start: 10, width: 30 },
    { id: "t-2", name: "Develop", start: 35, width: 40 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `t-${Date.now()}`, name, start: Math.floor(Math.random() * 60), width: Math.floor(Math.random() * 30) + 10 }]);
    setName("");
    setShow(false);
    notify("Task added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Gantt</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New task
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="py-3">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-900"><Calendar className="h-4 w-4 text-slate-400" /> {i.name}</div>
            <div className="h-4 w-full rounded bg-slate-100">
              <div className="h-full rounded bg-blue-600 transition-all duration-300" style={{ marginLeft: `${i.start}%`, width: `${i.width}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
