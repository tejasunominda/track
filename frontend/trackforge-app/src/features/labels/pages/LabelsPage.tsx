import { useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const labelColors = [
  { bg: "bg-red-100 text-red-700", dot: "bg-red-500" },
  { bg: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  { bg: "bg-green-100 text-green-700", dot: "bg-green-500" },
  { bg: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  { bg: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  { bg: "bg-pink-100 text-pink-700", dot: "bg-pink-500" },
];

interface Label { id: string; label: string; colorIdx: number; }

export function LabelsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Label[]>([
    { id: "l-1", label: "bug", colorIdx: 0 },
    { id: "l-2", label: "feature", colorIdx: 1 },
    { id: "l-3", label: "design", colorIdx: 4 },
    { id: "l-4", label: "wip", colorIdx: 5 },
    { id: "l-5", label: "docs", colorIdx: 2 },
  ]);
  const [newLabel, setNewLabel] = useState("");
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!newLabel.trim()) return; setItems((p) => [...p, { id: `l-${Date.now()}`, label: newLabel, colorIdx: selectedColor }]); setNewLabel(""); notify("Label created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Label removed"); };

  const filtered = items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Labels</h1><p className="text-sm text-slate-500">{items.length} labels</p></div>
        <form onSubmit={add} className="flex items-center gap-2">
          <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="New label…" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> Add</button>
        </form>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search labels..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex gap-1.5">
          {labelColors.map((c, idx) => <button key={idx} onClick={() => setSelectedColor(idx)} className={`h-6 w-6 rounded-full ${c.dot} transition-all hover:scale-110 ${selectedColor === idx ? "ring-2 ring-slate-900 ring-offset-1" : ""}`} />)}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const c = labelColors[i.colorIdx % labelColors.length];
          return (
            <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase ${c.bg}`}><span className={`h-2 w-2 rounded-full ${c.dot}`} /> {i.label}</span>
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
