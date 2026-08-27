import { useState } from "react";
import { Plus, Wrench, Trash2, Search, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CAPA { id: string; title: string; status: "Open" | "Closed"; type: "Corrective" | "Preventive"; }

const sColor = { Open: "bg-amber-100 text-amber-700", Closed: "bg-green-100 text-green-700" };
const sIcon = { Open: Clock, Closed: CheckCircle2 };

export function CAPAPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<CAPA[]>([
    { id: "ca-1", title: "Corrective action A", status: "Open", type: "Corrective" },
    { id: "ca-2", title: "Preventive action B", status: "Closed", type: "Preventive" },
    { id: "ca-3", title: "Process improvement", status: "Open", type: "Preventive" },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; setItems((p) => [...p, { id: `ca-${Date.now()}`, title, status: "Open", type: "Corrective" }]); setTitle(""); setShow(false); notify("CAPA created"); };
  const close = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Closed" } : i)); notify("CAPA closed"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("CAPA removed"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, open: items.filter((i) => i.status === "Open").length, closed: items.filter((i) => i.status === "Closed").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">CAPA</h1><p className="text-sm text-slate-500">{stats.total} items · {stats.open} open · {stats.closed} closed</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="CAPA title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search CAPA..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const Icon = sIcon[i.status];
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.status === "Closed" ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-amber-500 to-orange-500"}`}><Wrench className="h-5 w-5" /></div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Icon className="h-3 w-3" /> {i.status}</span>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="font-bold text-slate-900">{i.title}</div>
              <div className="mt-1 flex items-center gap-2"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{i.type}</span></div>
              {i.status !== "Closed" && <button onClick={() => close(i.id)} className="mt-3 w-full rounded-lg bg-blue-100 py-1.5 text-xs font-bold text-blue-700 transition-all hover:bg-blue-200">Close</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
