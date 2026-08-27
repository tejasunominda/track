import { useState } from "react";
import { Briefcase, Plus, Trash2, Search, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Deal { id: string; name: string; value: number; status: "Open" | "Negotiation" | "Won" | "Lost"; }

const sColor = { Open: "bg-blue-100 text-blue-700", Negotiation: "bg-amber-100 text-amber-700", Won: "bg-green-100 text-green-700", Lost: "bg-red-100 text-red-700" };
const sGradient = { Open: "from-blue-500 to-indigo-600", Negotiation: "from-amber-500 to-orange-500", Won: "from-green-500 to-emerald-600", Lost: "from-red-500 to-rose-600" };

export function DealsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Deal[]>([
    { id: "d-1", name: "Enterprise renewal", value: 250000, status: "Negotiation" },
    { id: "d-2", name: "Startup pilot", value: 12000, status: "Won" },
    { id: "d-3", name: "Mid-market expansion", value: 85000, status: "Open" },
  ]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const total = items.reduce((s, i) => s + i.value, 0);
  const won = items.filter((i) => i.status === "Won").reduce((s, i) => s + i.value, 0);

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !value.trim()) return; setItems((p) => [...p, { id: `d-${Date.now()}`, name, value: parseInt(value), status: "Open" }]); setName(""); setValue(""); setShow(false); notify("Deal created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Deal removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Deals</h1><p className="text-sm text-slate-500">Total: ${total.toLocaleString()} · Won: ${won.toLocaleString()}</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Deal name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search deals..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[i.status]} text-white shadow-md`}><Briefcase className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}>{i.status}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-2 flex items-center gap-1 text-lg font-bold text-slate-900"><DollarSign className="h-4 w-4 text-green-600" />{i.value.toLocaleString()}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400"><TrendingUp className="h-3 w-3" /> {i.status === "Won" ? "Closed won" : i.status === "Negotiation" ? "In negotiation" : "Open deal"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
