import { useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface IssueType { id: string; label: string; icon: string; color: string; }

const colors = ["from-blue-500 to-indigo-600", "from-green-500 to-emerald-600", "from-red-500 to-rose-600", "from-amber-500 to-orange-500", "from-purple-500 to-pink-500", "from-cyan-500 to-blue-500"];

export function IssueTypesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<IssueType[]>([
    { id: "it-1", label: "Story", icon: "S", color: colors[0] },
    { id: "it-2", label: "Bug", icon: "B", color: colors[2] },
    { id: "it-3", label: "Task", icon: "T", color: colors[1] },
    { id: "it-4", label: "Epic", icon: "E", color: colors[4] },
  ]);
  const [newLabel, setNewLabel] = useState("");
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!newLabel.trim()) return; setItems((p) => [...p, { id: `it-${Date.now()}`, label: newLabel, icon: newLabel[0].toUpperCase(), color: colors[p.length % colors.length] }]); setNewLabel(""); notify("Issue type created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Issue type removed"); };

  const filtered = items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Issue types</h1><p className="text-sm text-slate-500">{items.length} types configured</p></div>
        <form onSubmit={add} className="flex items-center gap-2">
          <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="New issue type…" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> Add</button>
        </form>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search issue types..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${i.color} text-sm font-bold text-white shadow-md`}>{i.icon}</span>
              <div><div className="font-bold text-slate-900">{i.label}</div><div className="text-xs text-slate-400">Issue type</div></div>
            </div>
            <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
