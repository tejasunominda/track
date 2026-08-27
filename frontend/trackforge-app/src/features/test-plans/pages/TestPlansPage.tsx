import { useState } from "react";
import { Plus, ClipboardList, Trash2, Play, CheckCircle2, Clock, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface TestPlan { id: string; name: string; cases: number; passed: number; failed: number; status: "Draft" | "Running" | "Passed" | "Failed"; }

const sColor = { Draft: "bg-slate-100 text-slate-600", Running: "bg-blue-100 text-blue-700", Passed: "bg-green-100 text-green-700", Failed: "bg-red-100 text-red-700" };
const sIcon = { Draft: Clock, Running: Play, Passed: CheckCircle2, Failed: CheckCircle2 };

export function TestPlansPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<TestPlan[]>([
    { id: "tp-1", name: "Regression suite", cases: 48, passed: 45, failed: 3, status: "Failed" },
    { id: "tp-2", name: "Smoke tests", cases: 12, passed: 12, failed: 0, status: "Passed" },
    { id: "tp-3", name: "API integration", cases: 24, passed: 0, failed: 0, status: "Draft" },
    { id: "tp-4", name: "E2E tests", cases: 36, passed: 0, failed: 0, status: "Draft" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `tp-${Date.now()}`, name, cases: 10, passed: 0, failed: 0, status: "Draft" }]); setName(""); setShow(false); notify("Test plan created"); };
  const remove = (id: string) => { setItems((p) => p.filter((t) => t.id !== id)); notify("Test plan deleted"); };
  const run = (id: string) => {
    setItems((p) => p.map((t) => t.id === id ? { ...t, status: "Running" } : t));
    setTimeout(() => {
      setItems((p) => p.map((t) => {
        if (t.id !== id) return t;
        const passed = Math.floor(Math.random() * t.cases);
        const failed = t.cases - passed;
        return { ...t, passed, failed, status: failed === 0 ? "Passed" : "Failed" };
      }));
      notify("Test run completed");
    }, 1500);
    notify("Test run started");
  };

  const filtered = items.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, passed: items.filter((t) => t.status === "Passed").length, running: items.filter((t) => t.status === "Running").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Test plans</h1><p className="text-sm text-slate-500">{stats.total} plans · {stats.passed} passed</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New plan</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Plan name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search test plans..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-3">
        {filtered.map((t) => {
          const Icon = sIcon[t.status];
          const pct = t.cases ? Math.round((t.passed / t.cases) * 100) : 0;
          return (
            <div key={t.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><ClipboardList className="h-5 w-5" /></div>
                  <div><div className="font-bold text-slate-900">{t.name}</div><div className="text-xs text-slate-500">{t.cases} test cases</div></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[t.status]}`}><Icon className={`h-3 w-3 ${t.status === "Running" ? "animate-spin" : ""}`} /> {t.status}</span>
                  {t.status === "Draft" && <button onClick={() => run(t.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><Play className="h-3.5 w-3.5" /> Run</button>}
                  <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              {t.status !== "Draft" && (
                <>
                  <div className="mb-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 font-bold text-green-600"><CheckCircle2 className="h-4 w-4" /> {t.passed} passed</span>
                    <span className="font-bold text-red-600">{t.failed} failed</span>
                    <span className="text-slate-400">{pct}% pass rate</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="flex h-full"><div className="bg-green-500 transition-all" style={{ width: `${(t.passed / t.cases) * 100}%` }} /><div className="bg-red-500 transition-all" style={{ width: `${(t.failed / t.cases) * 100}%` }} /></div></div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
