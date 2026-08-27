import { useState } from "react";
import { Play, Plus, Trash2, Search, Activity, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface TestRun { id: string; name: string; status: "Queued" | "Running" | "Passed" | "Failed"; suite: string; }

const sColor = { Queued: "bg-slate-100 text-slate-600", Running: "bg-blue-100 text-blue-700", Passed: "bg-green-100 text-green-700", Failed: "bg-red-100 text-red-700" };
const sIcon = { Queued: Clock, Running: Activity, Passed: CheckCircle2, Failed: Play };
const sGradient = { Queued: "from-slate-400 to-slate-600", Running: "from-blue-500 to-indigo-600", Passed: "from-green-500 to-emerald-600", Failed: "from-red-500 to-rose-600" };

export function TestRunsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<TestRun[]>([
    { id: "tr-1", name: "Run #42", status: "Running", suite: "Regression" },
    { id: "tr-2", name: "Run #41", status: "Passed", suite: "Smoke" },
    { id: "tr-3", name: "Run #40", status: "Failed", suite: "Integration" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `tr-${Date.now()}`, name, status: "Queued", suite: "General" }]); setName(""); setShow(false); notify("Run added"); };
  const start = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, status: "Running" } : i)); notify("Run started"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Run removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.suite.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, passed: items.filter((i) => i.status === "Passed").length, running: items.filter((i) => i.status === "Running").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Test runs</h1><p className="text-sm text-slate-500">{stats.total} runs · {stats.passed} passed · {stats.running} running</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New run</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Run name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search test runs..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const Icon = sIcon[i.status];
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${sGradient[i.status]} text-white shadow-md`}><Icon className="h-5 w-5" /></div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}>{i.status}</span>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="font-bold text-slate-900">{i.name}</div>
              <div className="mt-1"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{i.suite}</span></div>
              {i.status === "Queued" && <button onClick={() => start(i.id)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-blue-100 py-1.5 text-xs font-bold text-blue-700 transition-all hover:bg-blue-200"><Play className="h-3 w-3" /> Start</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
