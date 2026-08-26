import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const labelColors = ["bg-red-100 text-red-700", "bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-yellow-100 text-yellow-700"];

export function LabelsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "l-1", label: "bug" },
    { id: "l-2", label: "feature" },
    { id: "l-3", label: "design" },
  ]);
  const [newLabel, setNewLabel] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setItems((prev) => [...prev, { id: `l-${Date.now()}`, label: newLabel }]);
    setNewLabel("");
    notify("Label created");
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    notify("Label removed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Labels</h1>
        <form onSubmit={add} className="flex items-center gap-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="New label…"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i, idx) => (
          <div key={i.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
            <span className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-bold uppercase ${labelColors[idx % labelColors.length]}`}>
              <Tag className="h-3 w-3" /> {i.label}
            </span>
            <button onClick={() => remove(i.id)} className="text-xs text-slate-400 hover:text-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
