import { useState } from "react";
import { List, UserPlus, Trash2, Filter } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Ticket { id: string; key: string; subject: string; priority: "Low" | "Medium" | "High" | "Urgent"; assignee: string | null; status: string; }

export function QueuesPage() {
  const { notify } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "t-1", key: "Q-1", subject: "Login page broken on Safari", priority: "High", assignee: null, status: "Open" },
    { id: "t-2", key: "Q-2", subject: "Export to CSV fails", priority: "Medium", assignee: "Alice", status: "In Progress" },
    { id: "t-3", key: "Q-3", subject: "API rate limit too low", priority: "Urgent", assignee: null, status: "Open" },
    { id: "t-4", key: "Q-4", subject: "Dark mode toggle missing", priority: "Low", assignee: "Bob", status: "Resolved" },
  ]);
  const [filter, setFilter] = useState<string>("All");

  const assign = (id: string) => {
    setTickets((p) => p.map((t) => (t.id === id ? { ...t, assignee: "Me", status: "In Progress" } : t)));
    notify("Ticket assigned to you");
  };
  const resolve = (id: string) => {
    setTickets((p) => p.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t)));
    notify("Ticket resolved");
  };
  const remove = (id: string) => { setTickets((p) => p.filter((t) => t.id !== id)); notify("Ticket removed"); };

  const filtered = filter === "All" ? tickets : tickets.filter((t) => t.status === filter);
  const pColor = { Low: "bg-slate-100 text-slate-600", Medium: "bg-amber-100 text-amber-700", High: "bg-orange-100 text-orange-700", Urgent: "bg-red-100 text-red-700" };
  const sColor = { Open: "bg-blue-100 text-blue-700", "In Progress": "bg-purple-100 text-purple-700", Resolved: "bg-green-100 text-green-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Queues</h1>
          <p className="text-sm text-slate-500">{tickets.filter((t) => t.status === "Open").length} open · {tickets.filter((t) => t.assignee === null).length} unassigned</p>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <Filter className="h-4 w-4 text-slate-400" />
        {["All", "Open", "In Progress", "Resolved"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 ${filter === f ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{f}</button>
        ))}
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {filtered.map((t) => (
          <div key={t.id} className="group flex items-center justify-between p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="rounded bg-slate-900 px-2 py-1 font-mono text-xs font-bold text-white">{t.key}</span>
              <div>
                <div className="font-medium text-slate-900">{t.subject}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className={`rounded-full px-2 py-0.5 font-bold ${pColor[t.priority]}`}>{t.priority}</span>
                  <span className={`rounded-full px-2 py-0.5 font-bold ${sColor[t.status as keyof typeof sColor]}`}>{t.status}</span>
                  <span>{t.assignee ? `· ${t.assignee}` : "· Unassigned"}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!t.assignee && <button onClick={() => assign(t.id)} className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 transition-all hover:scale-105 hover:bg-blue-200"><UserPlus className="h-3.5 w-3.5" /> Assign to me</button>}
              {t.status !== "Resolved" && <button onClick={() => resolve(t.id)} className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200">Resolve</button>}
              <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="flex flex-col items-center py-12 text-slate-400"><List className="mb-2 h-8 w-8" /><p className="text-sm">Queue is empty</p></div>}
      </div>
    </div>
  );
}
