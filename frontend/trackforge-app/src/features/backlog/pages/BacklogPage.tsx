import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listIssues } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";
import { ListTodo, Search, ArrowUp, ArrowDown, Trash2, Flag, Layers } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function BacklogPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { notify } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    if (!projectId) return;
    listIssues(projectId).then((d) => { setIssues(d); setLoading(false); }).catch(console.error);
  }, [projectId]);

  const backlog = issues.filter((i) => i.statusName === "To Do");
  const priorities = ["All", ...new Set(backlog.map((i) => i.priority))];
  const filtered = backlog.filter((i) => (priorityFilter === "All" || i.priority === priorityFilter) && i.summary.toLowerCase().includes(search.toLowerCase()));

  const moveUp = (idx: number) => { if (idx === 0) return; setIssues((p) => { const all = [...p]; const bIdx = all.findIndex((x) => x.id === filtered[idx].id); const prevB = all.findIndex((x) => x.id === filtered[idx - 1].id); [all[bIdx], all[prevB]] = [all[prevB], all[bIdx]]; return all; }); };
  const moveDown = (idx: number) => { if (idx === filtered.length - 1) return; setIssues((p) => { const all = [...p]; const bIdx = all.findIndex((x) => x.id === filtered[idx].id); const nextB = all.findIndex((x) => x.id === filtered[idx + 1].id); [all[bIdx], all[nextB]] = [all[nextB], all[bIdx]]; return all; }); };
  const remove = (id: string) => { setIssues((p) => p.filter((i) => i.id !== id)); notify("Issue removed from backlog"); };

  const stats = { total: backlog.length, high: backlog.filter((i) => i.priority === "High" || i.priority === "Urgent").length, medium: backlog.filter((i) => i.priority === "Medium").length, low: backlog.filter((i) => i.priority === "Low").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center gap-2">
        <ListTodo className="h-6 w-6 text-slate-600" />
        <h1 className="text-2xl font-bold text-slate-900">Backlog</h1>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[{ label: "Total", val: stats.total, color: "from-blue-500 to-indigo-600" }, { label: "High priority", val: stats.high, color: "from-red-500 to-rose-600" }, { label: "Medium", val: stats.medium, color: "from-amber-500 to-orange-500" }, { label: "Low", val: stats.low, color: "from-green-500 to-emerald-600" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><Layers className="h-4 w-4" /></div>
            <div className="text-2xl font-bold text-slate-900">{s.val}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search backlog..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">{priorities.map((p) => <option key={p}>{p}</option>)}</select>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading && <div className="p-6 text-slate-500">Loading backlog…</div>}
        {!loading && filtered.length === 0 && <div className="p-6 text-center text-slate-400">No issues in backlog</div>}
        {filtered.map((i, idx) => (
          <div key={i.id} className="group flex items-center justify-between border-b border-slate-100 p-4 transition-all hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveUp(idx)} className="text-slate-300 hover:text-blue-600"><ArrowUp className="h-3.5 w-3.5" /></button>
                <button onClick={() => moveDown(idx)} className="text-slate-300 hover:text-blue-600"><ArrowDown className="h-3.5 w-3.5" /></button>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">{idx + 1}</div>
              <div>
                <div className="font-semibold text-slate-900">{i.summary}</div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-0.5"><Flag className="h-3 w-3" /> {i.priority}</span>
                  <span>{i.issueTypeName}</span>
                  <span className="font-mono">{i.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>
            <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
