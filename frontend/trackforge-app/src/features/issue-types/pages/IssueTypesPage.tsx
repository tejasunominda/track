import { useState } from "react";
import { Plus, Square } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function IssueTypesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "it-1", label: "Story", icon: "S" },
    { id: "it-2", label: "Bug", icon: "B" },
    { id: "it-3", label: "Task", icon: "T" },
  ]);
  const [newLabel, setNewLabel] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setItems((prev) => [...prev, { id: `it-${Date.now()}`, label: newLabel, icon: newLabel[0].toUpperCase() }]);
    setNewLabel("");
    notify("Issue type created");
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    notify("Issue type removed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Issue types</h1>
        <form onSubmit={add} className="flex items-center gap-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="New issue type…"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700"><Square className="h-4 w-4" /> {i.icon}</span>
              <span className="font-medium text-slate-900">{i.label}</span>
            </div>
            <button onClick={() => remove(i.id)} className="text-sm text-slate-400 hover:text-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
