import { useState } from "react";
import { Activity as ActivityIcon, Clock, Search, Filter, MessageSquare, Edit, Plus, CheckCircle2, User } from "lucide-react";

interface ActivityItem { id: string; user: string; action: string; target: string; type: "created" | "commented" | "updated" | "closed" | "logged"; time: string; }

const aIcon = { created: Plus, commented: MessageSquare, updated: Edit, closed: CheckCircle2, logged: Clock };
const aColor = { created: "from-green-500 to-emerald-600", commented: "from-blue-500 to-indigo-600", updated: "from-amber-500 to-orange-500", closed: "from-purple-500 to-pink-500", logged: "from-slate-500 to-slate-700" };

export function ActivityPage() {
  const [items] = useState<ActivityItem[]>([
    { id: "ac-1", user: "Alice", action: "created issue", target: "ENG-1", type: "created", time: "2 min ago" },
    { id: "ac-2", user: "Bob", action: "commented on", target: "ENG-2", type: "commented", time: "15 min ago" },
    { id: "ac-3", user: "You", action: "logged work on", target: "ENG-1", type: "logged", time: "1h ago" },
    { id: "ac-4", user: "Charlie", action: "updated", target: "ENG-3", type: "updated", time: "2h ago" },
    { id: "ac-5", user: "Dana", action: "closed issue", target: "ENG-5", type: "closed", time: "3h ago" },
    { id: "ac-6", user: "Alice", action: "created issue", target: "ENG-8", type: "created", time: "5h ago" },
    { id: "ac-7", user: "Bob", action: "commented on", target: "MKT-2", type: "commented", time: "8h ago" },
  ]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const types = ["All", "created", "commented", "updated", "closed", "logged"];
  const filtered = items.filter((i) => (typeFilter === "All" || i.type === typeFilter) && (i.user.toLowerCase().includes(search.toLowerCase()) || i.target.toLowerCase().includes(search.toLowerCase()) || i.action.toLowerCase().includes(search.toLowerCase())));
  const stats = { total: items.length, today: items.length, users: new Set(items.map((i) => i.user)).size };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Activity</h1><p className="text-sm text-slate-500">Recent actions across the workspace.</p></div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[{ label: "Total actions", val: stats.total, color: "from-blue-500 to-indigo-600" }, { label: "Active users", val: stats.users, color: "from-green-500 to-emerald-600" }, { label: "Today", val: stats.today, color: "from-amber-500 to-orange-500" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><ActivityIcon className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activity..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Filter className="h-3.5 w-3.5" /></span>
        <div className="flex flex-wrap gap-1">{types.map((t) => <button key={t} onClick={() => setTypeFilter(t)} className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize transition-all ${typeFilter === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t}</button>)}</div>
      </div>
      <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200">
        {filtered.map((i) => {
          const Icon = aIcon[i.type];
          return (
            <div key={i.id} className="relative mb-4">
              <span className={`absolute -left-4 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br ${aColor[i.type]} ring-4 ring-slate-50`} />
              <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${aColor[i.type]} text-white shadow-sm`}><Icon className="h-3.5 w-3.5" /></div>
                    <div className="flex items-center gap-1.5 font-medium text-slate-900">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-bold">{i.user}</span>
                      <span className="text-slate-500">{i.action}</span>
                      <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{i.target}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" /> {i.time}</div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="py-8 text-center text-slate-400">No activity found</div>}
      </div>
    </div>
  );
}
