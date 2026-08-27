import { useState } from "react";
import { Check, CheckCircle2, FileText, X, Clock, Search, User } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Approval { id: string; title: string; requester: string; status: "Pending" | "Approved" | "Rejected"; type: string; date: string; }

const sColor = { Pending: "bg-amber-100 text-amber-700", Approved: "bg-green-100 text-green-700", Rejected: "bg-red-100 text-red-700" };
const sIcon = { Pending: Clock, Approved: CheckCircle2, Rejected: X };

export function ApprovalsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Approval[]>([
    { id: "ap-1", title: "Q2 budget request", requester: "Alice", status: "Pending", type: "Budget", date: "2h ago" },
    { id: "ap-2", title: "New hire requisition", requester: "Bob", status: "Pending", type: "HR", date: "5h ago" },
    { id: "ap-3", title: "API access request", requester: "Charlie", status: "Pending", type: "Security", date: "1d ago" },
    { id: "ap-4", title: "Travel expense", requester: "Dana", status: "Approved", type: "Finance", date: "2d ago" },
    { id: "ap-5", title: "Equipment purchase", requester: "Eve", status: "Rejected", type: "Procurement", date: "3d ago" },
  ]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const decide = (id: string, approved: boolean) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: approved ? "Approved" : "Rejected" } : i)); notify(approved ? "Approved" : "Rejected"); };
  const approveAll = () => { setItems((p) => p.map((i) => i.status === "Pending" ? { ...i, status: "Approved" } : i)); notify("All pending approved"); };

  const statuses = ["All", "Pending", "Approved", "Rejected"];
  const filtered = items.filter((i) => (statusFilter === "All" || i.status === statusFilter) && (i.title.toLowerCase().includes(search.toLowerCase()) || i.requester.toLowerCase().includes(search.toLowerCase())));
  const stats = { total: items.length, pending: items.filter((i) => i.status === "Pending").length, approved: items.filter((i) => i.status === "Approved").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Approvals</h1><p className="text-sm text-slate-500">Review and action pending requests.</p></div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[{ label: "Total", val: stats.total, color: "from-blue-500 to-indigo-600" }, { label: "Pending", val: stats.pending, color: "from-amber-500 to-orange-500" }, { label: "Approved", val: stats.approved, color: "from-green-500 to-emerald-600" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><FileText className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search approvals..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {statuses.map((s) => <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${statusFilter === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}</button>)}
        {stats.pending > 0 && <button onClick={approveAll} className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:bg-green-200">Approve all</button>}
      </div>
      <div className="space-y-2">
        {filtered.map((i) => {
          const Icon = sIcon[i.status];
          return (
            <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${i.status === "Pending" ? "from-amber-500 to-orange-500" : i.status === "Approved" ? "from-green-500 to-emerald-600" : "from-red-500 to-rose-600"} text-white shadow-md`}><FileText className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.title}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{i.type}</span></div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400"><span className="flex items-center gap-0.5"><User className="h-3 w-3" /> {i.requester}</span><span>·</span><span>{i.date}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {i.status === "Pending" ? (
                  <>
                    <button onClick={() => decide(i.id, true)} className="rounded-lg bg-green-600 p-2 text-white transition-all hover:scale-105 hover:bg-green-700"><Check className="h-4 w-4" /></button>
                    <button onClick={() => decide(i.id, false)} className="rounded-lg bg-red-600 p-2 text-white transition-all hover:scale-105 hover:bg-red-700"><X className="h-4 w-4" /></button>
                  </>
                ) : (
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Icon className="h-3 w-3" /> {i.status}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
