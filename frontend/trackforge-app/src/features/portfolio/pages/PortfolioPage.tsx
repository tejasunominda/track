import { useEffect, useState } from "react";
import { Folder, Layers, TrendingUp } from "lucide-react";
import { listProjects } from "@/features/projects/api/projects";
import { listIssues } from "@/features/issues/api/issues";

export function PortfolioPage() {
  const [projects, setProjects] = useState<{ id: string; name: string; total: number; open: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listProjects()
      .then((projs) =>
        Promise.all(
          projs.map((p) =>
            listIssues(p.id).then((issues) => ({
              id: p.id,
              name: p.name,
              total: issues.length,
              open: issues.filter((i) => i.statusName !== "Done").length,
            }))
          )
        )
      )
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading portfolio…</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portfolio</h1>
        <p className="text-sm text-slate-500">Cross-project overview.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 font-bold text-slate-900">
              <Folder className="h-5 w-5 text-slate-400" /> {p.name}
            </div>
            <div className="mb-3 flex items-center gap-1 text-sm text-slate-500"><Layers className="h-4 w-4" /> {p.total} issues</div>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500"><span>Open</span><span>{p.open}</span></div>
            <div className="h-2 w-full overflow-hidden rounded bg-slate-100">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${p.total ? ((p.total - p.open) / p.total) * 100 : 0}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500"><TrendingUp className="h-3 w-3" /> {p.total ? Math.round(((p.total - p.open) / p.total) * 100) : 0}% complete</div>
          </div>
        ))}
      </div>
    </div>
  );
}
