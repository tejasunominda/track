import { useState } from "react";
import { Plus, RefreshCcw, Trash2, Search, ThumbsUp, AlertTriangle, Zap } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface RetroItem { id: string; title: string; category: "Went well" | "To improve" | "Action item"; }

const cConfig = {
  "Went well": { color: "bg-green-100 text-green-700", gradient: "from-green-500 to-emerald-600", icon: ThumbsUp },
  "To improve": { color: "bg-amber-100 text-amber-700", gradient: "from-amber-500 to-orange-500", icon: AlertTriangle },
  "Action item": { color: "bg-blue-100 text-blue-700", gradient: "from-blue-500 to-indigo-600", icon: Zap },
};

export function RetrospectivesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<RetroItem[]>([
    { id: "r-1", title: "Sprint retro", category: "Went well" },
    { id: "r-2", title: "Sprint retro 2", category: "To improve" },
    { id: "r-3", title: "Improve CI speed", category: "Action item" },
  ]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<RetroItem["category"]>("Went well");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; setItems((p) => [...p, { id: `r-${Date.now()}`, title, category }]); setTitle(""); setShow(false); notify("Retro item added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Retro item removed"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));
  const cats: RetroItem["category"][] = ["Went well", "To improve", "Action item"];

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Retrospectives</h1><p className="text-sm text-slate-500">{items.length} items</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New item</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Item" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={category} onChange={(e) => setCategory(e.target.value as RetroItem["category"])} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Went well</option><option>To improve</option><option>Action item</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search retro items..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {cats.map((cat) => {
          const cfg = cConfig[cat];
          const Icon = cfg.icon;
          const colItems = filtered.filter((i) => i.category === cat);
          return (
            <div key={cat} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2"><div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${cfg.gradient} text-white shadow-sm`}><Icon className="h-4 w-4" /></div><span className="font-bold text-slate-900">{cat}</span><span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">{colItems.length}</span></div>
              <div className="space-y-2">
                {colItems.map((i) => (
                  <div key={i.id} className="group flex items-start justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 transition-all hover:border-slate-200 hover:bg-white">
                    <div className="flex items-start gap-2"><RefreshCcw className="mt-0.5 h-4 w-4 text-slate-400" /><span className="text-sm font-medium text-slate-800">{i.title}</span></div>
                    <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
                {colItems.length === 0 && <div className="py-6 text-center text-xs text-slate-400">No items</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
