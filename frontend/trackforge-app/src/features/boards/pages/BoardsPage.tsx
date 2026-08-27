import { useState } from "react";
import { Columns, Plus, Trash2, Search, Kanban, Calendar, BarChart3 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { Link } from "react-router-dom";

interface Board { id: string; name: string; projectId: string; type: "Kanban" | "Scrum" | "Calendar" | "Report"; columns: number; issues: number; }

const tIcon = { Kanban: Kanban, Scrum: Columns, Calendar: Calendar, Report: BarChart3 };
const tColor = { Kanban: "from-blue-500 to-indigo-600", Scrum: "from-green-500 to-emerald-600", Calendar: "from-amber-500 to-orange-500", Report: "from-purple-500 to-pink-500" };

export function BoardsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Board[]>([
    { id: "b-1", name: "Sprint board", projectId: "p-1", type: "Scrum", columns: 4, issues: 24 },
    { id: "b-2", name: "Roadmap board", projectId: "p-2", type: "Kanban", columns: 5, issues: 42 },
    { id: "b-3", name: "Release calendar", projectId: "p-1", type: "Calendar", columns: 12, issues: 8 },
    { id: "b-4", name: "Velocity report", projectId: "p-2", type: "Report", columns: 3, issues: 6 },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Board["type"]>("Kanban");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `b-${Date.now()}`, name, projectId: "p-1", type, columns: 4, issues: 0 }]); setName(""); setShow(false); notify("Board created"); };
  const remove = (id: string) => { setItems((p) => p.filter((b) => b.id !== id)); notify("Board deleted"); };

  const filtered = items.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
  const totalIssues = items.reduce((s, b) => s + b.issues, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Boards</h1><p className="text-sm text-slate-500">{items.length} boards · {totalIssues} total issues</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New board</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Board name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value as Board["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Kanban</option><option>Scrum</option><option>Calendar</option><option>Report</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search boards..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => {
          const Icon = tIcon[b.type];
          return (
            <div key={b.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tColor[b.type]} text-white shadow-md`}><Icon className="h-5 w-5" /></div>
                <button onClick={() => remove(b.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
              <Link to={`/projects/${b.projectId}/board`} className="block">
                <div className="font-bold text-slate-900 transition-all hover:text-blue-600">{b.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{b.type}</span>
                  <span className="text-xs text-slate-400">{b.columns} columns</span>
                  <span className="text-xs text-slate-400">{b.issues} issues</span>
                </div>
                <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full bg-slate-100">
                  {Array.from({ length: Math.min(b.columns, 6) }).map((_, i) => <div key={i} className="flex-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" style={{ opacity: 1 - i * 0.12 }} />)}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
