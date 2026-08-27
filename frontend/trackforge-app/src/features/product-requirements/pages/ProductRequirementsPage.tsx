import { useState } from "react";
import { FileText, Plus, Trash2, Search, ChevronRight, User, Calendar } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface PRD { id: string; title: string; status: "Draft" | "In Review" | "Approved" | "Rejected"; author: string; date: string; sections: number; }

const sColor = { Draft: "bg-amber-100 text-amber-700", "In Review": "bg-blue-100 text-blue-700", Approved: "bg-green-100 text-green-700", Rejected: "bg-red-100 text-red-700" };
const sOrder = ["Draft", "In Review", "Approved", "Rejected"];

export function ProductRequirementsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<PRD[]>([
    { id: "prd-1", title: "Auth PRD", status: "Approved", author: "Alice", date: "Jan 15", sections: 8 },
    { id: "prd-2", title: "Search PRD", status: "Draft", author: "Bob", date: "Feb 3", sections: 4 },
    { id: "prd-3", title: "Mobile App PRD", status: "In Review", author: "Charlie", date: "Feb 20", sections: 12 },
    { id: "prd-4", title: "API v2 PRD", status: "Approved", author: "Dana", date: "Mar 1", sections: 15 },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; setItems((p) => [...p, { id: `prd-${Date.now()}`, title, status: "Draft", author: "You", date: "Today", sections: 1 }]); setTitle(""); setShow(false); notify("PRD created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("PRD deleted"); };
  const advance = (id: string) => { setItems((p) => p.map((i) => { if (i.id !== id) return i; const idx = sOrder.indexOf(i.status); if (idx >= sOrder.length - 1 || i.status === "Rejected") return i; return { ...i, status: sOrder[idx + 1] as PRD["status"] }; })); notify("Status updated"); };

  const statuses = ["All", ...sOrder];
  const filtered = items.filter((i) => (statusFilter === "All" || i.status === statusFilter) && i.title.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, approved: items.filter((i) => i.status === "Approved").length, draft: items.filter((i) => i.status === "Draft").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Product requirements</h1><p className="text-sm text-slate-500">{stats.total} PRDs · {stats.approved} approved · {stats.draft} in draft</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New PRD</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="PRD title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search PRDs..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {statuses.map((s) => <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${statusFilter === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}</button>)}
      </div>
      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><FileText className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.title}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sColor[i.status]}`}>{i.status}</span></div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400"><span className="flex items-center gap-0.5"><User className="h-3 w-3" /> {i.author}</span><span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {i.date}</span><span>{i.sections} sections</span></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {i.status !== "Approved" && i.status !== "Rejected" && <button onClick={() => advance(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 transition-all hover:scale-105 hover:bg-blue-200">Advance <ChevronRight className="h-3.5 w-3.5" /></button>}
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
