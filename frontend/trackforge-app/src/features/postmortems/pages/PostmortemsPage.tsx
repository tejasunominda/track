import { useState } from "react";
import { FileText, Plus, Trash2, Search, Rocket } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Postmortem { id: string; name: string; status: "Draft" | "Published"; severity: "Low" | "Medium" | "High"; date: string; }

const sColor = { Draft: "bg-slate-100 text-slate-600", Published: "bg-green-100 text-green-700" };
const sevColor = { Low: "bg-green-100 text-green-700", Medium: "bg-amber-100 text-amber-700", High: "bg-red-100 text-red-700" };

export function PostmortemsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Postmortem[]>([
    { id: "pm-1", name: "Root cause", status: "Draft", severity: "Medium", date: "Apr 1" },
    { id: "pm-2", name: "API outage", status: "Published", severity: "High", date: "Mar 15" },
    { id: "pm-3", name: "DB latency spike", status: "Published", severity: "Low", date: "Mar 1" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `pm-${Date.now()}`, name, status: "Draft", severity: "Medium", date: "Today" }]); setName(""); setShow(false); notify("Postmortem created"); };
  const publish = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Published" } : i)); notify("Postmortem published"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Postmortem removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, published: items.filter((i) => i.status === "Published").length, draft: items.filter((i) => i.status === "Draft").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Postmortems</h1><p className="text-sm text-slate-500">{stats.total} reports · {stats.published} published · {stats.draft} draft</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Postmortem" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search postmortems..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.status === "Published" ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><FileText className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}>{i.status}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><span className={`rounded-full px-2 py-0.5 font-bold ${sevColor[i.severity]}`}>{i.severity}</span><span>{i.date}</span></div>
            {i.status !== "Published" && <button onClick={() => publish(i.id)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-blue-100 py-1.5 text-xs font-bold text-blue-700 transition-all hover:bg-blue-200"><Rocket className="h-3 w-3" /> Publish</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
