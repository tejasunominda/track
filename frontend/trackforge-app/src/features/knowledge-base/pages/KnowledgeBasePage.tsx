import { useState } from "react";
import { BookOpen, Plus, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function KnowledgeBasePage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "kb-1", title: "Getting started", category: "Guide" },
    { id: "kb-2", title: "API reference", category: "Docs" },
  ]);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()));

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((prev) => [...prev, { id: `kb-${Date.now()}`, title, category: "Guide" }]);
    setTitle("");
    setShow(false);
    notify("Article created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Knowledge base</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New article
        </button>
      </div>
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…" className="flex-1 bg-transparent text-sm outline-none" />
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {filtered.length === 0 && <div className="p-6 text-center text-slate-500">No articles found.</div>}
        {filtered.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">{i.category}</div>
              </div>
            </div>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">{i.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
