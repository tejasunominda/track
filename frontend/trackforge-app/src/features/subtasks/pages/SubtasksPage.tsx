import { useState } from "react";
import { GitBranch, Plus, ChevronRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Subtask { id: string; parent: string; title: string; status: "To Do" | "In Progress" | "Done"; }

export function SubtasksPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Subtask[]>([
    { id: "st-1", parent: "ENG-1", title: "Write unit tests", status: "Done" },
    { id: "st-2", parent: "ENG-1", title: "Add integration tests", status: "In Progress" },
    { id: "st-3", parent: "ENG-2", title: "Design API schema", status: "To Do" },
  ]);
  const [title, setTitle] = useState("");
  const [parent, setParent] = useState("ENG-1");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((p) => [...p, { id: `st-${Date.now()}`, parent, title, status: "To Do" }]);
    setTitle(""); setShow(false); notify("Subtask created");
  };
  const cycle = (id: string) => {
    const order: Subtask["status"][] = ["To Do", "In Progress", "Done"];
    setItems((p) => p.map((s) => (s.id === id ? { ...s, status: order[(order.indexOf(s.status) + 1) % 3] } : s)));
    notify("Status updated");
  };
  const sColor = { "To Do": "bg-slate-100 text-slate-600", "In Progress": "bg-blue-100 text-blue-700", "Done": "bg-green-100 text-green-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subtasks</h1>
          <p className="text-sm text-slate-500">Break down parent issues into smaller pieces</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New subtask
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[auto_1fr_auto]">
          <input value={parent} onChange={(e) => setParent(e.target.value)} placeholder="Parent" className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono outline-none focus:border-blue-500" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Subtask title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <ChevronRight className="h-4 w-4 text-slate-300" />
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{s.parent}</span>
              <GitBranch className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-slate-900">{s.title}</span>
            </div>
            <button onClick={() => cycle(s.id)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 ${sColor[s.status]}`}>{s.status}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
