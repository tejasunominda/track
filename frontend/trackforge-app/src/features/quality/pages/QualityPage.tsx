import { useState } from "react";
import { ShieldCheck, Plus, Trash2, Play, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface TestRun { id: string; name: string; total: number; passed: number; failed: number; status: "Pending" | "Running" | "Passed" | "Failed"; }

export function QualityPage() {
  const { notify } = useToast();
  const [runs, setRuns] = useState<TestRun[]>([
    { id: "qr-1", name: "Smoke tests", total: 12, passed: 12, failed: 0, status: "Passed" },
    { id: "qr-2", name: "API integration", total: 24, passed: 22, failed: 2, status: "Failed" },
    { id: "qr-3", name: "E2E regression", total: 48, passed: 0, failed: 0, status: "Pending" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setRuns((p) => [...p, { id: `qr-${Date.now()}`, name, total: 10, passed: 0, failed: 0, status: "Pending" }]);
    setName(""); setShow(false); notify("Test run created");
  };
  const run = (id: string) => {
    setRuns((p) => p.map((r) => (r.id === id ? { ...r, status: "Running" } : r)));
    setTimeout(() => {
      setRuns((p) => p.map((r) => {
        if (r.id !== id) return r;
        const passed = Math.floor(Math.random() * r.total);
        const failed = r.total - passed;
        return { ...r, passed, failed, status: failed === 0 ? "Passed" : "Failed" };
      }));
      notify("Test run completed");
    }, 1500);
    notify("Test run started");
  };
  const remove = (id: string) => { setRuns((p) => p.filter((r) => r.id !== id)); notify("Run deleted"); };

  const sIcon = { Pending: Clock, Running: Clock, Passed: CheckCircle2, Failed: XCircle };
  const sColor = { Pending: "bg-slate-100 text-slate-600", Running: "bg-blue-100 text-blue-700", Passed: "bg-green-100 text-green-700", Failed: "bg-red-100 text-red-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quality</h1>
          <p className="text-sm text-slate-500">{runs.length} test runs · {runs.filter((r) => r.status === "Passed").length} passed</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New test run
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Test run name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-3">
        {runs.map((r) => {
          const Icon = sIcon[r.status];
          const pct = r.total ? Math.round((r.passed / r.total) * 100) : 0;
          return (
            <div key={r.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md"><ShieldCheck className="h-5 w-5" /></div>
                  <div>
                    <div className="font-bold text-slate-900">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.total} test cases</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[r.status]}`}><Icon className={`h-3 w-3 ${r.status === "Running" ? "animate-spin" : ""}`} /> {r.status}</span>
                  {r.status === "Pending" && <button onClick={() => run(r.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><Play className="h-3.5 w-3.5" /> Run</button>}
                  <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              {r.status !== "Pending" && (
                <>
                  <div className="mb-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 font-bold text-green-600"><CheckCircle2 className="h-4 w-4" /> {r.passed} passed</span>
                    <span className="flex items-center gap-1 font-bold text-red-600"><XCircle className="h-4 w-4" /> {r.failed} failed</span>
                    <span className="text-slate-400">{pct}% pass rate</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="flex h-full">
                      <div className="bg-green-500 transition-all" style={{ width: `${(r.passed / r.total) * 100}%` }} />
                      <div className="bg-red-500 transition-all" style={{ width: `${(r.failed / r.total) * 100}%` }} />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
