import { useState } from "react";
import { DollarSign, Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CostCenter { id: string; name: string; budget: number; spent: number; }

export function CostCentersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<CostCenter[]>([
    { id: "cc-1", name: "Engineering", budget: 500000, spent: 350000 },
    { id: "cc-2", name: "Marketing", budget: 100000, spent: 40000 },
    { id: "cc-3", name: "Operations", budget: 200000, spent: 180000 },
    { id: "cc-4", name: "R&D", budget: 300000, spent: 120000 },
  ]);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !budget.trim()) return; setItems((p) => [...p, { id: `cc-${Date.now()}`, name, budget: parseInt(budget), spent: 0 }]); setName(""); setBudget(""); setShow(false); notify("Cost center added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Cost center removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const totalBudget = items.reduce((s, i) => s + i.budget, 0);
  const totalSpent = items.reduce((s, i) => s + i.spent, 0);
  const pct = totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Cost centers</h1><p className="text-sm text-slate-500">${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()} total ({pct}%)</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cost centers..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-3">
        {filtered.map((i) => {
          const ratio = i.budget ? i.spent / i.budget : 0;
          const over = ratio > 0.8;
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${over ? "bg-gradient-to-br from-red-500 to-rose-600" : "bg-gradient-to-br from-green-500 to-emerald-600"}`}><DollarSign className="h-5 w-5" /></div>
                  <div><div className="font-bold text-slate-900">{i.name}</div><div className="text-xs text-slate-400">{over ? "Near budget limit" : "Within budget"}</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right"><div className="text-sm font-bold text-slate-900">${i.spent.toLocaleString()} <span className="text-slate-400">/ ${i.budget.toLocaleString()}</span></div><div className={`text-xs font-bold ${over ? "text-red-500" : "text-green-500"}`}>{Math.round(ratio * 100)}% used</div></div>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-500 ${over ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${Math.min(ratio * 100, 100)}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
