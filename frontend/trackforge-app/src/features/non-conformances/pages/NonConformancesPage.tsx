import { useState } from "react";
import { Plus, XOctagon, Trash2, Search, AlertCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface NC { id: string; name: string; severity: "Minor" | "Major" | "Critical"; status: "Open" | "Closed"; source: string; }

const sColor = { Open: "bg-red-100 text-red-700", Closed: "bg-green-100 text-green-700" };
const sevColor = { Minor: "bg-slate-100 text-slate-600", Major: "bg-amber-100 text-amber-700", Critical: "bg-red-100 text-red-700" };
const sevGradient = { Minor: "from-slate-400 to-slate-600", Major: "from-amber-500 to-orange-500", Critical: "from-red-500 to-rose-600" };

export function NonConformancesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<NC[]>([
    { id: "nc-1", name: "NC-22", severity: "Major", status: "Open", source: "Audit" },
    { id: "nc-2", name: "NC-23", severity: "Minor", status: "Closed", source: "Inspection" },
    { id: "nc-3", name: "NC-24", severity: "Critical", status: "Open", source: "Customer" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `nc-${Date.now()}`, name, severity: "Minor", status: "Open", source: "Internal" }]); setName(""); setShow(false); notify("Non-conformance created"); };
  const close = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Closed" } : i)); notify("Non-conformance closed"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Non-conformance removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.source.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, open: items.filter((i) => i.status === "Open").length, critical: items.filter((i) => i.severity === "Critical" && i.status === "Open").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Non-conformances</h1><p className="text-sm text-slate-500">{stats.total} items · {stats.open} open · {stats.critical} critical</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="NC name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search non-conformances..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sevGradient[i.severity]} text-white shadow-md`}><XOctagon className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}>{i.status}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><span className={`rounded-full px-2 py-0.5 font-bold ${sevColor[i.severity]}`}>{i.severity}</span><span className="flex items-center gap-0.5"><AlertCircle className="h-3 w-3" /> {i.source}</span></div>
            {i.status !== "Closed" && <button onClick={() => close(i.id)} className="mt-3 w-full rounded-lg bg-blue-100 py-1.5 text-xs font-bold text-blue-700 transition-all hover:bg-blue-200">Close</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
