import { useState } from "react";
import { Plus, ArrowRight, Workflow } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const colors: Record<string, string> = {
  TODO: "bg-slate-100 text-slate-600",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export function WorkflowsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "w-1", name: "Default Task Workflow", statuses: ["To Do", "In Progress", "Done"] },
    { id: "w-2", name: "Bug Workflow", statuses: ["Open", "In Progress", "Resolved", "Closed"] },
  ]);
  const [newName, setNewName] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setItems((prev) => [...prev, { id: `w-${Date.now()}`, name: newName, statuses: ["To Do", "In Progress", "Done"] }]);
    setNewName("");
    notify("Workflow created");
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    notify("Workflow removed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Workflows</h1>
        <form onSubmit={add} className="flex items-center gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New workflow…"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((w) => (
          <div key={w.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Workflow className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{w.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  {w.statuses.map((s, idx) => (
                    <span key={idx} className="flex items-center text-xs">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${s === "Done" ? colors.DONE : s === "In Progress" ? colors.IN_PROGRESS : colors.TODO}`}>{s}</span>
                      {idx < w.statuses.length - 1 && <ArrowRight className="mx-1 h-3 w-3 text-slate-300" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => remove(w.id)} className="text-sm text-slate-400 hover:text-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
