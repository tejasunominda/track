import { useState } from "react";
import { BookOpen, Plus, Trash2, Search, FileText, HelpCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Article { id: string; title: string; category: string; views: number; }

const cConfig: Record<string, { color: string; gradient: string; icon: typeof BookOpen }> = {
  Guide: { color: "bg-blue-100 text-blue-700", gradient: "from-blue-500 to-indigo-600", icon: BookOpen },
  Docs: { color: "bg-purple-100 text-purple-700", gradient: "from-purple-500 to-pink-500", icon: FileText },
  FAQ: { color: "bg-amber-100 text-amber-700", gradient: "from-amber-500 to-orange-500", icon: HelpCircle },
};

export function KnowledgeBasePage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Article[]>([
    { id: "kb-1", title: "Getting started", category: "Guide", views: 1250 },
    { id: "kb-2", title: "API reference", category: "Docs", views: 890 },
    { id: "kb-3", title: "Common issues", category: "FAQ", views: 2100 },
  ]);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()));
  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; setItems((p) => [...p, { id: `kb-${Date.now()}`, title, category: "Guide", views: 0 }]); setTitle(""); setShow(false); notify("Article created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Article removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Knowledge base</h1><p className="text-sm text-slate-500">{items.length} articles</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New article</button>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const cfg = cConfig[i.category] || cConfig.Guide;
          const Icon = cfg.icon;
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${cfg.gradient} text-white shadow-md`}><Icon className="h-5 w-5" /></div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${cfg.color}`}>{i.category}</span>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="font-bold text-slate-900">{i.title}</div>
              <div className="mt-1 text-xs text-slate-400">{i.views.toLocaleString()} views</div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="col-span-full rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-400">No articles found.</div>}
      </div>
    </div>
  );
}
