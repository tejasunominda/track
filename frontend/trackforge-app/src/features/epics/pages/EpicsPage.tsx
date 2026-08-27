import { useState } from "react";
import { Mountain, Plus, Target, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Epic { id: string; name: string; status: "To do" | "In progress" | "Done"; progress: number; issues: number; }

const sColor = { "To do": "bg-slate-100 text-slate-600", "In progress": "bg-blue-100 text-blue-700", Done: "bg-green-100 text-green-700" };
const sGradient = { "To do": "from-slate-400 to-slate-600", "In progress": "from-blue-500 to-indigo-600", Done: "from-green-500 to-emerald-600" };

export function EpicsPage() {
  const { notify } = useToast();
  const [epics, setEpics] = useState<Epic[]>([
    { id: "e-1", name: "Platform foundation", status: "In progress", progress: 60, issues: 15 },
    { id: "e-2", name: "User onboarding", status: "To do", progress: 0, issues: 8 },
    { id: "e-3", name: "Reporting suite", status: "Done", progress: 100, issues: 12 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setEpics((p) => [...p, { id: `e-${Date.now()}`, name, status: "To do", progress: 0, issues: 0 }]); setName(""); setShow(false); notify("Epic created"); };
  const remove = (id: string) => { setEpics((p) => p.filter((e) => e.id !== id)); notify("Epic removed"); };

  const filtered = epics.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: epics.length, inProgress: epics.filter((e) => e.status === "In progress").length, done: epics.filter((e) => e.status === "Done").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Epics</h1><p className="text-sm text-slate-500">{stats.total} epics · {stats.inProgress} in progress · {stats.done} done</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New epic</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Epic name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search epics..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-3">
        {filtered.map((e) => (
          <div key={e.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[e.status]} text-white shadow-md`}><Mountain className="h-5 w-5" /></div>
                <div><div className="font-bold text-slate-900">{e.name}</div><div className="text-xs text-slate-400">{e.issues} issues</div></div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[e.status]}`}>{e.status}</span>
                <button onClick={() => remove(e.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500"><span className="flex items-center gap-1"><Target className="h-3 w-3" /> Progress</span><span className="font-bold text-slate-700">{e.progress}%</span></div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-500 ${e.status === "Done" ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`} style={{ width: `${e.progress}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
