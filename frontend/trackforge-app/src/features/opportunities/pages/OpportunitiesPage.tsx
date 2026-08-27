import { useState } from "react";
import { DollarSign, Plus, Trash2, Search, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Opportunity { id: string; name: string; value: number; stage: "Qualification" | "Proposal" | "Negotiation" | "Closed"; }

const stColor = { Qualification: "bg-blue-100 text-blue-700", Proposal: "bg-purple-100 text-purple-700", Negotiation: "bg-amber-100 text-amber-700", Closed: "bg-green-100 text-green-700" };
const stGradient = { Qualification: "from-blue-500 to-indigo-600", Proposal: "from-purple-500 to-pink-500", Negotiation: "from-amber-500 to-orange-500", Closed: "from-green-500 to-emerald-600" };

export function OpportunitiesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Opportunity[]>([
    { id: "op-1", name: "Expansion", value: 120000, stage: "Qualification" },
    { id: "op-2", name: "New logo", value: 45000, stage: "Proposal" },
    { id: "op-3", name: "Upsell Q2", value: 78000, stage: "Negotiation" },
  ]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const total = items.reduce((s, i) => s + i.value, 0);
  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !value.trim()) return; setItems((p) => [...p, { id: `op-${Date.now()}`, name, value: parseInt(value), stage: "Qualification" }]); setName(""); setValue(""); setShow(false); notify("Opportunity created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Opportunity removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Opportunities</h1><p className="text-sm text-slate-500">Pipeline: ${total.toLocaleString()}</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Opportunity name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search opportunities..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${stGradient[i.stage]} text-white shadow-md`}><Target className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${stColor[i.stage]}`}>{i.stage}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-2 flex items-center gap-1 text-lg font-bold text-slate-900"><DollarSign className="h-4 w-4 text-green-600" />{i.value.toLocaleString()}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400"><TrendingUp className="h-3 w-3" /> {i.stage === "Closed" ? "Closed deal" : "Open opportunity"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
