import { useEffect, useState } from "react";
import { Archive, RotateCcw, Search, Trash2, Filter, Calendar } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { listIssues, updateIssue } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";

export function ArchivePage() {
  const { notify } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => { setLoading(true); listIssues("p-1").then((data) => { setIssues(data.filter((i) => i.statusName === "Done")); setLoading(false); }).catch(console.error); }, []);

  const restore = async (id: string) => { try { await updateIssue(id, { statusName: "To Do", statusCategory: "TODO" }); setIssues((prev) => prev.filter((i) => i.id !== id)); notify("Issue restored"); } catch (err) { notify("Failed to restore", "error"); console.error(err); } };
  const remove = (id: string) => { setIssues((prev) => prev.filter((i) => i.id !== id)); notify("Issue permanently deleted"); };

  const types = ["All", ...new Set(issues.map((i) => i.issueTypeName).filter((x): x is string => !!x))];
  const filtered = issues.filter((i) => (typeFilter === "All" || i.issueTypeName === typeFilter) && (i.summary.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Archive</h1><p className="text-sm text-slate-500">{issues.length} archived issues</p></div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[{ label: "Archived", val: issues.length, color: "from-slate-500 to-slate-700" }, { label: "Issue types", val: new Set(issues.map((i) => i.issueTypeName)).size, color: "from-blue-500 to-indigo-600" }, { label: "Priorities", val: new Set(issues.map((i) => i.priority)).size, color: "from-amber-500 to-orange-500" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><Archive className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search archived issues..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Filter className="h-3.5 w-3.5" /></span>
        {types.map((t) => <button key={t} onClick={() => setTypeFilter(t)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${typeFilter === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t}</button>)}
      </div>
      {loading ? <div className="p-6 text-slate-500">Loading archive…</div> : (
        <div className="space-y-2">
          {filtered.length === 0 && <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-400"><Archive className="mx-auto mb-2 h-10 w-10" />No archived issues.</div>}
          {filtered.map((i) => (
            <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-md"><Archive className="h-4 w-4" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="rounded bg-slate-200 px-2 py-0.5 font-mono text-xs font-bold text-slate-600">{i.id.slice(0, 8)}</span><span className="font-bold text-slate-900">{i.summary}</span></div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400"><span>{i.issueTypeName}</span><span>·</span><span>{i.priority}</span><span>·</span><span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {i.statusName}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => restore(i.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><RotateCcw className="h-3.5 w-3.5" /> Restore</button>
                <button onClick={() => remove(i.id)} className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition-all hover:scale-105 hover:bg-red-200"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
