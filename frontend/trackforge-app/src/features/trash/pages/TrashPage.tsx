import { useState } from "react";
import { Trash2, RotateCcw, Search, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface TrashItem { id: string; key: string; name: string; type: string; deletedBy: string; daysLeft: number; }

export function TrashPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<TrashItem[]>([
    { id: "tr-1", key: "ENG-20", name: "Old auth flow", type: "Issue", deletedBy: "Alice", daysLeft: 25 },
    { id: "tr-2", key: "ENG-21", name: "Legacy API", type: "Issue", deletedBy: "Bob", daysLeft: 12 },
    { id: "tr-3", key: "DOC-3", name: "Old spec", type: "Document", deletedBy: "Charlie", daysLeft: 3 },
    { id: "tr-4", key: "PRJ-3", name: "Deprecated project", type: "Project", deletedBy: "Dana", daysLeft: 7 },
  ]);
  const [search, setSearch] = useState("");

  const restore = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Item restored from trash"); };
  const purge = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Item permanently deleted"); };
  const emptyAll = () => { setItems([]); notify("Trash emptied permanently"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.key.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trash</h1>
          <p className="text-sm text-slate-500">{items.length} items · auto-purge in ≤30 days</p>
        </div>
        {items.length > 0 && <button onClick={emptyAll} className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"><Trash2 className="h-4 w-4" /> Empty trash</button>}
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search trash..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-md"><Trash2 className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-200 px-2 py-0.5 font-mono text-xs font-bold text-slate-600">{i.key}</span>
                  <span className="font-bold text-slate-900">{i.name}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{i.type}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                  <span>by {i.deletedBy}</span>
                  {i.daysLeft <= 7 ? <span className="flex items-center gap-0.5 font-bold text-red-500"><AlertTriangle className="h-3 w-3" /> Purges in {i.daysLeft}d</span> : <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {i.daysLeft}d left</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => restore(i.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><RotateCcw className="h-3.5 w-3.5" /> Restore</button>
              <button onClick={() => purge(i.id)} className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition-all hover:scale-105 hover:bg-red-200">Delete forever</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="flex flex-col items-center py-16 text-slate-400"><Trash2 className="mb-2 h-10 w-10" /><p className="text-sm">Trash is empty</p></div>}
      </div>
    </div>
  );
}
