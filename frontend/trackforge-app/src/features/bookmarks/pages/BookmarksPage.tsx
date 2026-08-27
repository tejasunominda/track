import { useState } from "react";
import { Bookmark, Plus, Trash2, Star, ExternalLink, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface BookmarkItem { id: string; title: string; url: string; category: string; }

export function BookmarksPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<BookmarkItem[]>([
    { id: "b-1", title: "TrackForge docs", url: "https://docs.trackforge.io", category: "Docs" },
    { id: "b-2", title: "Sprint board", url: "/projects/p-1/board", category: "Internal" },
    { id: "b-3", title: "API reference", url: "https://api.trackforge.io", category: "Docs" },
    { id: "b-4", title: "Staging environment", url: "https://staging.trackforge.io", category: "Environments" },
  ]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Docs");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((p) => [...p, { id: `b-${Date.now()}`, title, url, category }]);
    setTitle(""); setUrl(""); setShow(false); notify("Bookmark added");
  };
  const remove = (id: string) => { setItems((p) => p.filter((b) => b.id !== id)); notify("Bookmark removed"); };

  const filtered = items.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()));
  const cats = [...new Set(filtered.map((b) => b.category))];

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookmarks</h1>
          <p className="text-sm text-slate-500">{items.length} bookmarks in {cats.length} categories</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New bookmark
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL or path" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookmarks..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-4">
        {cats.map((cat) => (
          <div key={cat}>
            <div className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500"><Star className="h-3 w-3 text-amber-400" /> {cat}</div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.filter((b) => b.category === cat).map((b) => (
                <div key={b.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md"><Bookmark className="h-4 w-4" /></div>
                    <div className="overflow-hidden">
                      <div className="truncate font-bold text-slate-900">{b.title}</div>
                      <div className="truncate font-mono text-xs text-blue-600">{b.url}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <a href={b.url} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-100 p-1.5 text-slate-600 transition-all hover:bg-slate-200"><ExternalLink className="h-4 w-4" /></a>
                    <button onClick={() => remove(b.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
