import { useState } from "react";
import { BookOpen, Plus, Trash2, FileText, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface WikiPage { id: string; title: string; content: string; updatedAt: string; }

export function WikiPage() {
  const { notify } = useToast();
  const [pages, setPages] = useState<WikiPage[]>([
    { id: "w-1", title: "Getting Started", content: "Welcome to TrackForge wiki. Here you can document team processes.", updatedAt: "2 days ago" },
    { id: "w-2", title: "Engineering Guidelines", content: "Code review checklist and merge requirements.", updatedAt: "1 week ago" },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<WikiPage | null>(null);
  const [query, setQuery] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const p = { id: `w-${Date.now()}`, title, content: "", updatedAt: "just now" };
    setPages((prev) => [p, ...prev]);
    setTitle(""); setShow(false); setSelected(p); notify("Wiki page created");
  };
  const save = () => {
    if (!selected) return;
    setPages((p) => p.map((x) => (x.id === selected.id ? { ...selected, updatedAt: "just now" } : x)));
    notify("Wiki page saved");
  };
  const remove = (id: string) => { setPages((p) => p.filter((x) => x.id !== id)); if (selected?.id === id) setSelected(null); notify("Page deleted"); };

  const filtered = pages.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wiki</h1>
          <p className="text-sm text-slate-500">{pages.length} pages</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New page
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className={`group flex w-full items-center justify-between p-3 text-left transition-all hover:bg-slate-50 ${selected?.id === p.id ? "bg-blue-50" : ""}`}>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">{p.title}</span>
                </div>
                <Trash2 onClick={(e) => { e.stopPropagation(); remove(p.id); }} className="h-3.5 w-3.5 text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          {selected ? (
            <>
              <input value={selected.title} onChange={(e) => setSelected({ ...selected, title: e.target.value })} className="mb-3 w-full border-b border-slate-200 pb-2 text-lg font-bold text-slate-900 outline-none focus:border-blue-500" />
              <textarea value={selected.content} onChange={(e) => setSelected({ ...selected, content: e.target.value })} rows={12} className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-700 outline-none focus:border-blue-500" placeholder="Write content..." />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">Updated {selected.updatedAt}</span>
                <button onClick={save} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BookOpen className="mb-3 h-10 w-10 text-slate-300" />
              <p className="text-sm text-slate-400">Select a page to view or edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
