import { useState } from "react";
import { ArrowRightLeft, Plus, Trash2, Upload, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Job { id: string; name: string; source: string; target: string; records: number; status: "Pending" | "Running" | "Completed" | "Failed"; }

export function MigratePage() {
  const { notify } = useToast();
  const [jobs, setJobs] = useState<Job[]>([
    { id: "mj-1", name: "Jira import", source: "Jira CSV", target: "TrackForge", records: 1240, status: "Completed" },
    { id: "mj-2", name: "GitHub issues sync", source: "GitHub", target: "TrackForge", records: 380, status: "Running" },
    { id: "mj-3", name: "Legacy data export", source: "TrackForge", target: "Postgres dump", records: 0, status: "Pending" },
  ]);
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setJobs((p) => [...p, { id: `mj-${Date.now()}`, name, source, target: "TrackForge", records: 0, status: "Pending" }]);
    setName(""); setSource(""); setShow(false); notify("Migration job created");
  };
  const run = (id: string) => {
    setJobs((p) => p.map((j) => (j.id === id ? { ...j, status: "Running" } : j)));
    setTimeout(() => {
      setJobs((p) => p.map((j) => (j.id === id ? { ...j, status: "Completed", records: Math.floor(Math.random() * 1000) + 100 } : j)));
      notify("Migration completed");
    }, 1500);
    notify("Migration started");
  };
  const remove = (id: string) => { setJobs((p) => p.filter((j) => j.id !== id)); notify("Job removed"); };

  const sIcon = { Pending: Clock, Running: Clock, Completed: CheckCircle2, Failed: AlertCircle };
  const sColor = { Pending: "bg-slate-100 text-slate-600", Running: "bg-blue-100 text-blue-700", Completed: "bg-green-100 text-green-700", Failed: "bg-red-100 text-red-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Migrate</h1>
          <p className="text-sm text-slate-500">{jobs.length} migration jobs</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New migration
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Job name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source (e.g. Jira CSV)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-3">
        {jobs.map((j) => {
          const Icon = sIcon[j.status];
          return (
            <div key={j.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md"><ArrowRightLeft className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-slate-900">{j.name}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="font-mono">{j.source}</span><ArrowRightLeft className="h-3 w-3" /><span className="font-mono">{j.target}</span>
                    {j.records > 0 && <span>· {j.records.toLocaleString()} records</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[j.status]}`}><Icon className={`h-3 w-3 ${j.status === "Running" ? "animate-spin" : ""}`} /> {j.status}</span>
                {j.status === "Pending" && <button onClick={() => run(j.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><Upload className="h-3.5 w-3.5" /> Start</button>}
                {j.status === "Completed" && <button onClick={() => notify("Download started")} className="rounded-lg bg-slate-100 p-1.5 text-slate-600 transition-all hover:bg-slate-200"><Download className="h-4 w-4" /></button>}
                <button onClick={() => remove(j.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
