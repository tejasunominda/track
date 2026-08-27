import { useState } from "react";
import { CheckSquare, Plus, Trash2, Search, Shield, ShieldCheck } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Control { id: string; name: string; status: "Compliant" | "In review" | "Non-compliant"; framework: string; }

const sColor = { Compliant: "bg-green-100 text-green-700", "In review": "bg-amber-100 text-amber-700", "Non-compliant": "bg-red-100 text-red-700" };
const sGradient = { Compliant: "from-green-500 to-emerald-600", "In review": "from-amber-500 to-orange-500", "Non-compliant": "from-red-500 to-rose-600" };

export function CompliancePage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Control[]>([
    { id: "c-1", name: "GDPR", status: "Compliant", framework: "Privacy" },
    { id: "c-2", name: "SOC2", status: "In review", framework: "Security" },
    { id: "c-3", name: "HIPAA", status: "Non-compliant", framework: "Healthcare" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `c-${Date.now()}`, name, status: "In review", framework: "General" }]); setName(""); setShow(false); notify("Control added"); };
  const pass = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Compliant" } : i)); notify("Control marked compliant"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Control removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.framework.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, compliant: items.filter((i) => i.status === "Compliant").length, review: items.filter((i) => i.status === "In review").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Compliance</h1><p className="text-sm text-slate-500">{stats.total} controls · {stats.compliant} compliant · {stats.review} in review</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New control</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Control name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search controls..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[i.status]} text-white shadow-md`}>{i.status === "Compliant" ? <ShieldCheck className="h-5 w-5" /> : <Shield className="h-5 w-5" />}</div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}>{i.status}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-1"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{i.framework}</span></div>
            {i.status !== "Compliant" && <button onClick={() => pass(i.id)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-green-100 py-1.5 text-xs font-bold text-green-700 transition-all hover:bg-green-200"><CheckSquare className="h-3 w-3" /> Pass</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
