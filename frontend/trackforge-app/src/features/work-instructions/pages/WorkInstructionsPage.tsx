import { useState } from "react";
import { ClipboardList, Plus, Trash2, Search, CheckCircle2, FileText } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface WorkInstruction { id: string; title: string; status: "Draft" | "Approved"; department: string; }

const sColor = { Draft: "bg-slate-100 text-slate-600", Approved: "bg-green-100 text-green-700" };
const sGradient = { Draft: "from-slate-400 to-slate-600", Approved: "from-green-500 to-emerald-600" };

export function WorkInstructionsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<WorkInstruction[]>([
    { id: "wi-1", title: "Step 1", status: "Approved", department: "Assembly" },
    { id: "wi-2", title: "Step 2", status: "Draft", department: "QA" },
    { id: "wi-3", title: "Safety check", status: "Draft", department: "Safety" },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; setItems((p) => [...p, { id: `wi-${Date.now()}`, title, status: "Draft", department: "General" }]); setTitle(""); setShow(false); notify("Work instruction created"); };
  const approve = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Approved" } : i)); notify("Work instruction approved"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Work instruction removed"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.department.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, approved: items.filter((i) => i.status === "Approved").length, draft: items.filter((i) => i.status === "Draft").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Work instructions</h1><p className="text-sm text-slate-500">{stats.total} instructions · {stats.approved} approved · {stats.draft} draft</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Instruction title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search work instructions..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[i.status]} text-white shadow-md`}><ClipboardList className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}>{i.status === "Approved" && <CheckCircle2 className="h-3 w-3" />}{i.status}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.title}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><FileText className="h-3 w-3" /> {i.department}</div>
            {i.status !== "Approved" && <button onClick={() => approve(i.id)} className="mt-3 w-full rounded-lg bg-green-100 py-1.5 text-xs font-bold text-green-700 transition-all hover:bg-green-200">Approve</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
