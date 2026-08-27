import { useState } from "react";
import { Search, Clock, X, Filter, Bug, FileText, CheckSquare, CheckCircle2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface SearchResult { id: string; key: string; summary: string; type: "Bug" | "Feature" | "Task"; priority: string; status: string; project: string; }

const typeIcon = { Bug: Bug, Feature: FileText, Task: CheckSquare };
const typeColor = { Bug: "from-red-500 to-rose-600", Feature: "from-blue-500 to-indigo-600", Task: "from-green-500 to-emerald-600" };

export function SearchPage() {
  const { notify } = useToast();
  const [q, setQ] = useState('type = "Bug" AND priority = "High"');
  const [results] = useState<SearchResult[]>([
    { id: "r-1", key: "ENG-1", summary: "Fix login redirect loop", type: "Bug", priority: "High", status: "In Progress", project: "Engineering" },
    { id: "r-2", key: "ENG-5", summary: "API returns 500 on large payloads", type: "Bug", priority: "High", status: "To Do", project: "Engineering" },
    { id: "r-3", key: "MKT-3", summary: "Email template rendering broken", type: "Bug", priority: "Urgent", status: "In Progress", project: "Marketing" },
    { id: "r-4", key: "ENG-8", summary: "Memory leak in websocket handler", type: "Bug", priority: "High", status: "Done", project: "Engineering" },
  ]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [history, setHistory] = useState<string[]>(['type = "Bug" AND priority = "High"', "assignee = me", "status = 'In Progress'"]);
  const [searched, setSearched] = useState(false);

  const runSearch = () => {
    setSearched(true);
    setHistory((p) => [q, ...p.filter((h) => h !== q)].slice(0, 5));
    notify(`Found ${results.length} results`);
  };
  const clearFilters = () => { setTypeFilter("All"); setQ(""); setSearched(false); };

  const filtered = results.filter((r) => typeFilter === "All" || r.type === typeFilter);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Search issues</h1>
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <Search className="h-5 w-5 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Enter TQL query..." className="flex-1 bg-transparent font-mono text-sm outline-none" />
        <button onClick={runSearch} className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">Search</button>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Filter className="h-3.5 w-3.5" /> Filter:</span>
        {["All", "Bug", "Feature", "Task"].map((t) => <button key={t} onClick={() => setTypeFilter(t)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${typeFilter === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t}</button>)}
        <button onClick={clearFilters} className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200"><X className="h-3 w-3" /> Clear</button>
      </div>
      {history.length > 0 && (
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-1 text-xs font-bold text-slate-400"><Clock className="h-3 w-3" /> Recent searches</div>
          <div className="flex flex-wrap gap-2">{history.map((h, i) => <button key={i} onClick={() => setQ(h)} className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs text-slate-600 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600">{h}</button>)}</div>
        </div>
      )}
      {searched && (
        <div>
          <div className="mb-2 text-sm text-slate-500">{filtered.length} results for <span className="font-mono font-bold text-slate-700">{q}</span></div>
          <div className="space-y-2">
            {filtered.map((r) => {
              const Icon = typeIcon[r.type];
              return (
                <div key={r.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${typeColor[r.type]} text-white shadow-md`}><Icon className="h-4 w-4" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{r.key}</span>
                        <span className="font-bold text-slate-900">{r.summary}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                        <span>{r.project}</span><span>·</span><span>{r.priority}</span><span>·</span>
                        <span className={`flex items-center gap-0.5 ${r.status === "Done" ? "text-green-600" : ""}`}>{r.status === "Done" && <CheckCircle2 className="h-3 w-3" />}{r.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-400"><Search className="mx-auto mb-2 h-10 w-10" />No results found</div>}
          </div>
        </div>
      )}
      {!searched && <p className="text-sm text-slate-500">TQL search: <span className="font-mono font-bold text-slate-700">{q}</span></p>}
    </div>
  );
}
