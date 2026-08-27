import { useState } from "react";
import { Filter, Plus, Trash2, Search, Star } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface QFilter { id: string; name: string; query: string; favorite: boolean; }

export function QuickFiltersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<QFilter[]>([
    { id: "qf-1", name: "My open issues", query: "assignee = me AND status != Done", favorite: true },
    { id: "qf-2", name: "High priority bugs", query: "type = Bug AND priority >= High", favorite: false },
    { id: "qf-3", name: "Created this week", query: "created >= -7d", favorite: true },
  ]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `qf-${Date.now()}`, name, query, favorite: false }]);
    setName(""); setQuery(""); setShow(false); notify("Filter created");
  };
  const toggleFav = (id: string) => {
    setItems((p) => p.map((f) => (f.id === id ? { ...f, favorite: !f.favorite } : f)));
  };
  const remove = (id: string) => { setItems((p) => p.filter((f) => f.id !== id)); notify("Filter deleted"); };

  const filtered = items.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  const favs = filtered.filter((f) => f.favorite);
  const rest = filtered.filter((f) => !f.favorite);

  const render = (list: QFilter[]) => (
    <div className="space-y-2">
      {list.map((f) => (
        <div key={f.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={() => toggleFav(f.id)} className="transition-transform hover:scale-110">
              <Star className={`h-5 w-5 ${f.favorite ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
            </button>
            <div>
              <div className="font-bold text-slate-900">{f.name}</div>
              <div className="font-mono text-xs text-slate-500">{f.query}</div>
            </div>
          </div>
          <button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quick filters</h1>
          <p className="text-sm text-slate-500">{items.length} filters · {favs.length} favorites</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New filter
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Filter name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='e.g. assignee = me AND status != "Done"' className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search filters..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      {favs.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-600"><Filter className="h-3 w-3" /> Favorites</div>
          {render(favs)}
        </div>
      )}
      {rest.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">All filters</div>
          {render(rest)}
        </div>
      )}
    </div>
  );
}
