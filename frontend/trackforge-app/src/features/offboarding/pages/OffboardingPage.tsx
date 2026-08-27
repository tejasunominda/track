import { useState } from "react";
import { LogOut, Plus, Trash2, Search, CheckCircle2, Clock, Circle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface OffTask { id: string; name: string; status: "Pending" | "In progress" | "Done"; assignee: string; }

const sColor = { Pending: "bg-slate-100 text-slate-600", "In progress": "bg-blue-100 text-blue-700", Done: "bg-green-100 text-green-700" };
const sIcon = { Pending: Circle, "In progress": Clock, Done: CheckCircle2 };
const sGradient = { Pending: "from-slate-400 to-slate-600", "In progress": "from-blue-500 to-indigo-600", Done: "from-green-500 to-emerald-600" };

export function OffboardingPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<OffTask[]>([
    { id: "off-1", name: "Exit", status: "In progress", assignee: "HR" },
    { id: "off-2", name: "Handover", status: "Pending", assignee: "Manager" },
    { id: "off-3", name: "Return equipment", status: "Pending", assignee: "IT" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `off-${Date.now()}`, name, status: "Pending", assignee: "Unassigned" }]); setName(""); setShow(false); notify("Task created"); };
  const complete = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Done" } : i)); notify("Offboarding completed"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Task removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.assignee.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, done: items.filter((i) => i.status === "Done").length, pending: items.filter((i) => i.status !== "Done").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Offboarding</h1><p className="text-sm text-slate-500">{stats.total} tasks · {stats.done} done · {stats.pending} pending</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New task</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Task" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((i) => {
          const Icon = sIcon[i.status];
          return (
            <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[i.status]} text-white shadow-md`}><LogOut className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.name}</span><span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Icon className="h-3 w-3" /> {i.status}</span></div>
                  <div className="mt-0.5 text-xs text-slate-400">Assignee: {i.assignee}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {i.status !== "Done" && <button onClick={() => complete(i.id)} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-green-700">Done</button>}
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
