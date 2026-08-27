import { useState } from "react";
import { Network, Plus, Trash2, Search, ChevronRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface OrgNode { id: string; name: string; reportsTo: string; level: number; }

const levelColor = ["from-purple-500 to-pink-500", "from-blue-500 to-indigo-600", "from-green-500 to-emerald-600", "from-amber-500 to-orange-500", "from-cyan-500 to-blue-500"];

export function OrgChartPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<OrgNode[]>([
    { id: "oc-1", name: "CEO", reportsTo: "Board", level: 0 },
    { id: "oc-2", name: "VP Eng", reportsTo: "CEO", level: 1 },
    { id: "oc-3", name: "VP Sales", reportsTo: "CEO", level: 1 },
    { id: "oc-4", name: "Eng Manager", reportsTo: "VP Eng", level: 2 },
  ]);
  const [name, setName] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !reportsTo.trim()) return; const parent = items.find((i) => i.name === reportsTo); setItems((p) => [...p, { id: `oc-${Date.now()}`, name, reportsTo, level: parent ? parent.level + 1 : 0 }]); setName(""); setReportsTo(""); setShow(false); notify("Node added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Node removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.reportsTo.toLowerCase().includes(search.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => a.level - b.level);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Org chart</h1><p className="text-sm text-slate-500">{items.length} nodes · {new Set(items.map((i) => i.level)).size} levels</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New node</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={reportsTo} onChange={(e) => setReportsTo(e.target.value)} placeholder="Reports to" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search org chart..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="relative pl-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-slate-200">
        {sorted.map((i) => (
          <div key={i.id} className="group relative mb-3" style={{ paddingLeft: `${i.level * 20}px` }}>
            <span className={`absolute -left-4 top-3 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br ${levelColor[i.level % levelColor.length]} ring-4 ring-slate-50`} />
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${levelColor[i.level % levelColor.length]} text-white shadow-md`}><Network className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.name}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">L{i.level}</span></div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><ChevronRight className="h-3 w-3" /> Reports to {i.reportsTo}</div>
                </div>
              </div>
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
