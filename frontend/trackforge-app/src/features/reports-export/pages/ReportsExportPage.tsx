import { useState } from "react";
import { Download, Plus, Trash2, FileText, Clock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface ExportJob { id: string; name: string; format: "CSV" | "PDF" | "Excel" | "JSON"; records: number; status: "Queued" | "Processing" | "Ready"; createdAt: string; }

export function ReportsExportPage() {
  const { notify } = useToast();
  const [jobs, setJobs] = useState<ExportJob[]>([
    { id: "ex-1", name: "Monthly issues report", format: "PDF", records: 450, status: "Ready", createdAt: "2h ago" },
    { id: "ex-2", name: "Sprint velocity data", format: "Excel", records: 24, status: "Ready", createdAt: "1d ago" },
    { id: "ex-3", name: "Audit log export", format: "CSV", records: 0, status: "Queued", createdAt: "just now" },
  ]);
  const [name, setName] = useState("");
  const [format, setFormat] = useState<ExportJob["format"]>("CSV");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const id = `ex-${Date.now()}`;
    setJobs((p) => [...p, { id, name, format, records: 0, status: "Queued", createdAt: "just now" }]);
    setName(""); setShow(false); notify("Export queued");
    setTimeout(() => {
      setJobs((p) => p.map((j) => (j.id === id ? { ...j, status: "Processing" } : j)));
    }, 800);
    setTimeout(() => {
      setJobs((p) => p.map((j) => (j.id === id ? { ...j, status: "Ready", records: Math.floor(Math.random() * 500) + 50 } : j)));
      notify("Export ready");
    }, 2500);
  };
  const download = (j: ExportJob) => { notify(`Downloading ${j.name}.${j.format.toLowerCase()}`); };
  const remove = (id: string) => { setJobs((p) => p.filter((j) => j.id !== id)); notify("Export removed"); };

  const fColor = { CSV: "from-green-500 to-emerald-600", PDF: "from-red-500 to-rose-600", Excel: "from-blue-500 to-indigo-600", JSON: "from-amber-500 to-orange-500" };
  const sIcon = { Queued: Clock, Processing: Clock, Ready: CheckCircle2 };
  const sColor = { Queued: "bg-slate-100 text-slate-600", Processing: "bg-blue-100 text-blue-700", Ready: "bg-green-100 text-green-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports export</h1>
          <p className="text-sm text-slate-500">{jobs.filter((j) => j.status === "Ready").length} ready to download</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New export
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Export name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={format} onChange={(e) => setFormat(e.target.value as ExportJob["format"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>CSV</option><option>PDF</option><option>Excel</option><option>JSON</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-2">
        {jobs.map((j) => {
          const Icon = sIcon[j.status];
          return (
            <div key={j.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${fColor[j.format]} text-white shadow-md`}><FileText className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{j.name}</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{j.format}</span>
                  </div>
                  <div className="text-xs text-slate-500">{j.records > 0 ? `${j.records.toLocaleString()} records` : "—"} · {j.createdAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[j.status]}`}><Icon className={`h-3 w-3 ${j.status === "Processing" ? "animate-spin" : ""}`} /> {j.status}</span>
                {j.status === "Ready" && <button onClick={() => download(j)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:scale-105 hover:bg-blue-700"><Download className="h-3.5 w-3.5" /> Download</button>}
                <button onClick={() => remove(j.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
