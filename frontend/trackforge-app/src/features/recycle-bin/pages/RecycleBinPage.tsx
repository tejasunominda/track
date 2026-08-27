import { useState } from "react";
import { Trash2, RotateCcw, Clock, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface DeletedItem { id: string; key: string; name: string; type: string; deletedAt: string; }

export function RecycleBinPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<DeletedItem[]>([
    { id: "rb-1", key: "ENG-10", name: "Old login flow", type: "Issue", deletedAt: "2h ago" },
    { id: "rb-2", key: "ENG-11", name: "Deprecated API endpoint", type: "Issue", deletedAt: "1d ago" },
    { id: "rb-3", key: "PRJ-2", name: "Legacy project", type: "Project", deletedAt: "3d ago" },
    { id: "rb-4", key: "DOC-5", name: "Old spec document", type: "Document", deletedAt: "1w ago" },
  ]);
  const [search, setSearch] = useState("");

  const restore = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Item restored"); };
  const purge = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Item permanently deleted"); };
  const empty = () => { setItems([]); notify("Recycle bin emptied"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.key.toLowerCase().includes(search.toLowerCase()));

  const tColor = { Issue: "bg-blue-100 text-blue-700", Project: "bg-purple-100 text-purple-700", Document: "bg-amber-100 text-amber-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recycle bin</h1>
          <p className="text-sm text-slate-500">{items.length} items · auto-purge after 30 days</p>
        </div>
        {items.length > 0 && <button onClick={empty} className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition-all hover:bg-red-200"><Trash2 className="h-4 w-4" /> Empty bin</button>}
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search deleted items..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
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
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tColor[i.type as keyof typeof tColor] || "bg-slate-100 text-slate-600"}`}>{i.type}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" /> Deleted {i.deletedAt}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => restore(i.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><RotateCcw className="h-3.5 w-3.5" /> Restore</button>
              <button onClick={() => purge(i.id)} className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition-all hover:scale-105 hover:bg-red-200">Purge</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="flex flex-col items-center py-16 text-slate-400"><Trash2 className="mb-2 h-10 w-10" /><p className="text-sm">Recycle bin is empty</p></div>}
      </div>
    </div>
  );
}
