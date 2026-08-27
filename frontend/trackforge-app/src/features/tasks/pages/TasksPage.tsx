import { useState } from "react";
import { CheckSquare, Square, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Task { id: string; title: string; done: boolean; priority: "Low" | "Medium" | "High"; }

export function TasksPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Task[]>([
    { id: "t-1", title: "Review pull requests", done: false, priority: "High" },
    { id: "t-2", title: "Update documentation", done: true, priority: "Medium" },
    { id: "t-3", title: "Refactor auth module", done: false, priority: "Low" },
  ]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((p) => [...p, { id: `t-${Date.now()}`, title, done: false, priority }]);
    setTitle(""); setShow(false); notify("Task created");
  };
  const toggle = (id: string) => {
    setItems((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    notify("Task updated");
  };
  const remove = (id: string) => { setItems((p) => p.filter((t) => t.id !== id)); notify("Task deleted"); };

  const pColor = { Low: "bg-slate-100 text-slate-600", Medium: "bg-amber-100 text-amber-700", High: "bg-red-100 text-red-700" };
  const done = items.filter((t) => t.done).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
          <p className="text-sm text-slate-500">{done} of {items.length} completed</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New task
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" autoFocus />
          <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((t) => (
          <div key={t.id} className="group flex items-center justify-between p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <button onClick={() => toggle(t.id)} className="transition-transform hover:scale-110">
                {t.done ? <CheckSquare className="h-5 w-5 text-green-500" /> : <Square className="h-5 w-5 text-slate-400" />}
              </button>
              <span className={`font-medium ${t.done ? "text-slate-400 line-through" : "text-slate-900"}`}>{t.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${pColor[t.priority]}`}>{t.priority}</span>
            </div>
            <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
