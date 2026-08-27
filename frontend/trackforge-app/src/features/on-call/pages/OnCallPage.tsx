import { useState } from "react";
import { Phone, Plus, Trash2, Search, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface OnCallEntry { id: string; person: string; start: string; end: string; status: "Active" | "Upcoming" | "Completed"; }

const sColor = { Active: "bg-green-100 text-green-700", Upcoming: "bg-blue-100 text-blue-700", Completed: "bg-slate-100 text-slate-500" };

export function OnCallPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<OnCallEntry[]>([
    { id: "oc-1", person: "Alice", start: "2025-04-01", end: "2025-04-02", status: "Completed" },
    { id: "oc-2", person: "Bob", start: "2025-04-03", end: "2025-04-04", status: "Active" },
    { id: "oc-3", person: "Charlie", start: "2025-04-05", end: "2025-04-06", status: "Upcoming" },
  ]);
  const [person, setPerson] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!person.trim()) return; const now = new Date(); const start = now.toISOString().split("T")[0]; const end = new Date(now.setDate(now.getDate() + 1)).toISOString().split("T")[0]; setItems((p) => [...p, { id: `oc-${Date.now()}`, person, start, end, status: "Upcoming" }]); setPerson(""); setShow(false); notify("On-call added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("On-call removed"); };

  const filtered = items.filter((i) => i.person.toLowerCase().includes(search.toLowerCase()));
  const active = items.filter((i) => i.status === "Active").length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">On-call</h1><p className="text-sm text-slate-500">{items.length} schedules · {active} active</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> Add</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      {active > 0 && <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3"><AlertCircle className="h-4 w-4 text-green-600" /><span className="text-sm font-bold text-green-700">{active} person currently on-call</span></div>}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search on-call..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.status === "Active" ? "bg-gradient-to-br from-green-500 to-emerald-600" : i.status === "Upcoming" ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><Phone className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.person}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sColor[i.status]}`}>{i.status}</span></div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" /> {i.start} → {i.end}</div>
              </div>
            </div>
            <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
