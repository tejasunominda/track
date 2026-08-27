import { useState } from "react";
import { History, Search, ArrowDown } from "lucide-react";

interface Change { id: string; issue: string; field: string; oldValue: string; newValue: string; user: string; time: string; }

export function HistoryPage() {
  const [items] = useState<Change[]>([
    { id: "h-1", issue: "ENG-1", field: "Status", oldValue: "To Do", newValue: "In Progress", user: "Alice", time: "2 min ago" },
    { id: "h-2", issue: "ENG-2", field: "Assignee", oldValue: "—", newValue: "Bob", user: "Alice", time: "15 min ago" },
    { id: "h-3", issue: "ENG-1", field: "Priority", oldValue: "Medium", newValue: "High", user: "Charlie", time: "1h ago" },
    { id: "h-4", issue: "ENG-3", field: "Sprint", oldValue: "Backlog", newValue: "Sprint 12", user: "Dana", time: "2h ago" },
    { id: "h-5", issue: "ENG-2", field: "Status", oldValue: "In Progress", newValue: "Done", user: "Bob", time: "3h ago" },
    { id: "h-6", issue: "ENG-4", field: "Labels", oldValue: "—", newValue: "bug, urgent", user: "Alice", time: "5h ago" },
  ]);
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All");

  const fields = ["All", ...new Set(items.map((i) => i.field))];
  const filtered = items.filter((i) => (fieldFilter === "All" || i.field === fieldFilter) && (i.issue.toLowerCase().includes(search.toLowerCase()) || i.user.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">History</h1>
        <p className="text-sm text-slate-500">{items.length} changes tracked</p>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by issue or user..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <select value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
          {fields.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative space-y-0">
          {filtered.map((c, i) => (
            <div key={c.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><History className="h-4 w-4" /></div>
                {i < filtered.length - 1 && <div className="w-px flex-1 bg-slate-200" />}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{c.issue}</span>
                  <span className="text-sm font-medium text-slate-900">{c.field}</span>
                  <span className="text-xs text-slate-400">changed by {c.user}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="rounded-lg bg-red-50 px-2 py-0.5 text-xs text-red-600 line-through">{c.oldValue}</span>
                  <ArrowDown className="h-3 w-3 text-slate-400" />
                  <span className="rounded-lg bg-green-50 px-2 py-0.5 text-xs font-bold text-green-600">{c.newValue}</span>
                </div>
                <div className="mt-1 text-xs text-slate-400">{c.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
