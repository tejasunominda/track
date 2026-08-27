import { useState } from "react";
import { Briefcase, Plus, Trash2, Search, Users } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface JobDesc { id: string; title: string; level: string; department: string; openings: number; }

const lColor = { Junior: "bg-blue-100 text-blue-700", Mid: "bg-green-100 text-green-700", Senior: "bg-purple-100 text-purple-700", Lead: "bg-amber-100 text-amber-700", Principal: "bg-red-100 text-red-700" };

export function JobDescriptionsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<JobDesc[]>([
    { id: "jd-1", title: "Engineer", level: "Senior", department: "Engineering", openings: 2 },
    { id: "jd-2", title: "Designer", level: "Mid", department: "Design", openings: 1 },
    { id: "jd-3", title: "Product Manager", level: "Lead", department: "Product", openings: 1 },
    { id: "jd-4", title: "DevOps Engineer", level: "Mid", department: "Engineering", openings: 3 },
  ]);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim() || !level.trim()) return; setItems((p) => [...p, { id: `jd-${Date.now()}`, title, level, department: "General", openings: 1 }]); setTitle(""); setLevel(""); setShow(false); notify("Job description created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Job description removed"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.level.toLowerCase().includes(search.toLowerCase()) || i.department.toLowerCase().includes(search.toLowerCase()));
  const totalOpenings = items.reduce((s, i) => s + i.openings, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Job descriptions</h1><p className="text-sm text-slate-500">{items.length} positions · {totalOpenings} openings</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New JD</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job descriptions..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Briefcase className="h-5 w-5" /></div>
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mb-1 flex items-center gap-2"><span className="font-bold text-slate-900">{i.title}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${lColor[i.level as keyof typeof lColor] || "bg-slate-100 text-slate-600"}`}>{i.level}</span></div>
            <div className="mb-3 text-xs text-slate-400">{i.department}</div>
            <div className="flex items-center gap-1 border-t border-slate-100 pt-3"><Users className="h-3.5 w-3.5 text-blue-500" /><span className="text-sm font-bold text-slate-900">{i.openings}</span><span className="text-[10px] text-slate-400">open positions</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
