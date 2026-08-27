import { useEffect, useState } from "react";
import { Folder, Layers, TrendingUp, Search, CheckCircle2 } from "lucide-react";
import { listProjects } from "@/features/projects/api/projects";
import { listIssues } from "@/features/issues/api/issues";

interface PortfolioItem { id: string; name: string; total: number; open: number; }

export function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    listProjects()
      .then((projs) => Promise.all(projs.map((p) => listIssues(p.id).then((issues) => ({ id: p.id, name: p.name, total: issues.length, open: issues.filter((i) => i.statusName !== "Done").length })))))
      .then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading portfolio…</div>;

  const filtered = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const totalIssues = projects.reduce((s, p) => s + p.total, 0);
  const totalOpen = projects.reduce((s, p) => s + p.open, 0);
  const avgComplete = totalIssues ? Math.round(((totalIssues - totalOpen) / totalIssues) * 100) : 0;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portfolio</h1>
        <p className="text-sm text-slate-500">Cross-project overview.</p>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[{ label: "Projects", val: projects.length, icon: Folder, color: "from-blue-500 to-indigo-600" }, { label: "Total issues", val: totalIssues, icon: Layers, color: "from-purple-500 to-pink-500" }, { label: "Avg complete", val: `${avgComplete}%`, icon: CheckCircle2, color: "from-green-500 to-emerald-600" }].map((s) => {
          const Icon = s.icon;
          return <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><Icon className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>;
        })}
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const pct = p.total ? Math.round(((p.total - p.open) / p.total) * 100) : 0;
          return (
            <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-2 flex items-center gap-2 font-bold text-slate-900"><Folder className="h-5 w-5 text-blue-500" /> {p.name}</div>
              <div className="mb-3 flex items-center gap-1 text-sm text-slate-500"><Layers className="h-4 w-4 text-slate-400" /> {p.total} issues · {p.open} open</div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500"><span>Progress</span><span className="font-bold text-slate-700">{pct}%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500" style={{ width: `${pct}%` }} /></div>
              <div className="mt-2 flex items-center gap-1 text-xs text-slate-500"><TrendingUp className="h-3 w-3" /> {pct}% complete</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
