import { useState } from "react";
import { Headphones, Plus, Trash2, Search, Mail } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Ticket { id: string; subject: string; requester: string; status: "Open" | "In Progress" | "Resolved"; priority: "Low" | "Medium" | "High"; }

const sColor = { Open: "bg-blue-100 text-blue-700", "In Progress": "bg-amber-100 text-amber-700", Resolved: "bg-green-100 text-green-700" };
const pColor = { Low: "bg-slate-100 text-slate-600", Medium: "bg-amber-100 text-amber-700", High: "bg-red-100 text-red-700" };

export function ServiceDeskPage() {
  const { notify } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "t-1", subject: "Cannot reset password", requester: "user@example.com", status: "Open", priority: "High" },
    { id: "t-2", subject: "Request new project", requester: "manager@example.com", status: "Resolved", priority: "Medium" },
    { id: "t-3", subject: "Export not working", requester: "analyst@example.com", status: "In Progress", priority: "Medium" },
  ]);
  const [subject, setSubject] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!subject.trim()) return; setTickets((p) => [...p, { id: `t-${Date.now()}`, subject, requester: "customer@example.com", status: "Open", priority: "Medium" }]); setSubject(""); setShow(false); notify("Ticket created"); };
  const remove = (id: string) => { setTickets((p) => p.filter((t) => t.id !== id)); notify("Ticket removed"); };

  const statuses = ["All", "Open", "In Progress", "Resolved"];
  const filtered = tickets.filter((t) => (statusFilter === "All" || t.status === statusFilter) && (t.subject.toLowerCase().includes(search.toLowerCase()) || t.requester.toLowerCase().includes(search.toLowerCase())));
  const stats = { total: tickets.length, open: tickets.filter((t) => t.status === "Open").length, resolved: tickets.filter((t) => t.status === "Resolved").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Service desk</h1><p className="text-sm text-slate-500">{stats.total} tickets · {stats.open} open · {stats.resolved} resolved</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New ticket</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ticket subject" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tickets..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {statuses.map((s) => <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${statusFilter === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}</button>)}
      </div>
      <div className="space-y-2">
        {filtered.map((t) => (
          <div key={t.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${t.status === "Resolved" ? "bg-gradient-to-br from-green-500 to-emerald-600" : t.status === "In Progress" ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}><Headphones className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{t.subject}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${pColor[t.priority]}`}>{t.priority}</span></div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><Mail className="h-3 w-3" /> {t.requester}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[t.status]}`}>{t.status}</span>
              <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
