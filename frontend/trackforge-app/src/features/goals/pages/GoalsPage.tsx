import { useState } from "react";
import { Flag, Plus, Target, Trash2, Search, TrendingUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Goal { id: string; name: string; progress: number; owner: string; }

export function GoalsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Goal[]>([
    { id: "g-1", name: "Q1 target", progress: 70, owner: "Alice" },
    { id: "g-2", name: "Reduce churn", progress: 45, owner: "Bob" },
    { id: "g-3", name: "Launch v2.0", progress: 20, owner: "Charlie" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `g-${Date.now()}`, name, progress: 0, owner: "Unassigned" }]); setName(""); setShow(false); notify("Goal created"); };
  const bump = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, progress: Math.min(i.progress + 10, 100) } : i)); notify("Progress updated"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Goal removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.owner.toLowerCase().includes(search.toLowerCase()));
  const avg = items.length ? Math.round(items.reduce((s, i) => s + i.progress, 0) / items.length) : 0;
  const completed = items.filter((i) => i.progress === 100).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Goals</h1><p className="text-sm text-slate-500">{items.length} goals · {avg}% avg progress · {completed} completed</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New goal</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Goal name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search goals..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.progress === 100 ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}><Target className="h-5 w-5" /></div>
                <div><div className="font-bold text-slate-900">{i.name}</div><div className="text-xs text-slate-400">Owner: {i.owner}</div></div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => bump(i.id)} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-700">+10%</button>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500"><span className="flex items-center gap-1"><Flag className="h-3 w-3" /> Progress</span><span className="font-bold text-slate-700">{i.progress}%</span></div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-500 ${i.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`} style={{ width: `${i.progress}%` }} /></div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500"><TrendingUp className="h-3 w-3" /> {i.progress === 100 ? "Completed!" : `${100 - i.progress}% remaining`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
