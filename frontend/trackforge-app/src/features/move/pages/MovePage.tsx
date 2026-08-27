import { useState } from "react";
import { FolderInput, ArrowRight, Trash2, Search, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface MoveJob { id: string; issue: string; fromProject: string; toProject: string; }

export function MovePage() {
  const { notify } = useToast();
  const [jobs, setJobs] = useState<MoveJob[]>([
    { id: "mv-1", issue: "ENG-5", fromProject: "Engineering", toProject: "Operations" },
    { id: "mv-2", issue: "MKT-2", fromProject: "Marketing", toProject: "Design" },
    { id: "mv-3", issue: "DSN-1", fromProject: "Design", toProject: "Engineering" },
  ]);
  const [issue, setIssue] = useState("");
  const [from, setFrom] = useState("Engineering");
  const [to, setTo] = useState("Operations");
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!issue.trim()) return; setJobs((p) => [...p, { id: `mv-${Date.now()}`, issue, fromProject: from, toProject: to }]); setIssue(""); notify("Issue moved successfully"); };
  const remove = (id: string) => { setJobs((p) => p.filter((j) => j.id !== id)); notify("Record removed"); };

  const filtered = jobs.filter((j) => j.issue.toLowerCase().includes(search.toLowerCase()) || j.fromProject.toLowerCase().includes(search.toLowerCase()) || j.toProject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Move</h1><p className="text-sm text-slate-500">{jobs.length} move operations</p></div>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[{ label: "Total moves", val: jobs.length, color: "from-blue-500 to-indigo-600" }, { label: "From Engineering", val: jobs.filter((j) => j.fromProject === "Engineering").length, color: "from-amber-500 to-orange-500" }, { label: "To Engineering", val: jobs.filter((j) => j.toProject === "Engineering").length, color: "from-green-500 to-emerald-600" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><ArrowLeftRight className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>
        ))}
      </div>
      <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
        <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Engineering</option><option>Marketing</option><option>Design</option><option>Operations</option></select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Operations</option><option>Engineering</option><option>Marketing</option><option>Design</option></select>
        <button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">Move</button>
      </form>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search move jobs..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((j) => (
          <div key={j.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md"><FolderInput className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{j.issue}</span>
                <span className="text-sm font-medium text-slate-600">{j.fromProject}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-900">{j.toProject}</span>
              </div>
            </div>
            <button onClick={() => remove(j.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
