import { useState } from "react";
import { ListChecks, Plus, Trash2, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Procedure { id: string; title: string; owner: string; status: "Draft" | "Active" | "Deprecated"; steps: number; }

const sColor = { Draft: "bg-amber-100 text-amber-700", Active: "bg-green-100 text-green-700", Deprecated: "bg-red-100 text-red-700" };
const sIcon = { Draft: Clock, Active: CheckCircle2, Deprecated: AlertCircle };

export function ProceduresPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Procedure[]>([
    { id: "pr-1", title: "Incident response", owner: "SRE", status: "Active", steps: 8 },
    { id: "pr-2", title: "Change approval", owner: "Engineering", status: "Active", steps: 5 },
    { id: "pr-3", title: "Onboarding checklist", owner: "HR", status: "Draft", steps: 12 },
    { id: "pr-4", title: "Deploy rollback", owner: "DevOps", status: "Deprecated", steps: 6 },
  ]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim() || !owner.trim()) return; setItems((p) => [...p, { id: `pr-${Date.now()}`, title, owner, status: "Draft", steps: 1 }]); setTitle(""); setOwner(""); setShow(false); notify("Procedure created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Procedure removed"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.owner.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, active: items.filter((i) => i.status === "Active").length, draft: items.filter((i) => i.status === "Draft").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Procedures</h1><p className="text-sm text-slate-500">{stats.total} procedures · {stats.active} active</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Procedure title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search procedures..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const Icon = sIcon[i.status];
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><ListChecks className="h-5 w-5" /></div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Icon className="h-3 w-3" /> {i.status}</span>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="font-bold text-slate-900">{i.title}</div>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><span>Owner: {i.owner}</span><span>·</span><span>{i.steps} steps</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
