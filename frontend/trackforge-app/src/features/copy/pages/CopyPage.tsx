import { useState } from "react";
import { Copy, ArrowRight, Trash2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CopyJob { id: string; issue: string; fromProject: string; toProject: string; status: "Copied" | "Pending"; }

export function CopyPage() {
  const { notify } = useToast();
  const [jobs, setJobs] = useState<CopyJob[]>([
    { id: "cp-1", issue: "ENG-1", fromProject: "Engineering", toProject: "Marketing", status: "Copied" },
    { id: "cp-2", issue: "ENG-3", fromProject: "Engineering", toProject: "Design", status: "Copied" },
  ]);
  const [issue, setIssue] = useState("");
  const [from, setFrom] = useState("Engineering");
  const [to, setTo] = useState("Marketing");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setJobs((p) => [...p, { id: `cp-${Date.now()}`, issue, fromProject: from, toProject: to, status: "Copied" }]);
    setIssue(""); notify("Issue copied successfully");
  };
  const remove = (id: string) => { setJobs((p) => p.filter((j) => j.id !== id)); notify("Record removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Copy</h1>
        <p className="text-sm text-slate-500">{jobs.length} copy operations</p>
      </div>
      <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
        <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
          <option>Engineering</option><option>Marketing</option><option>Design</option><option>Operations</option>
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
          <option>Marketing</option><option>Engineering</option><option>Design</option><option>Operations</option>
        </select>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Copy</button>
      </form>
      <div className="space-y-2">
        {jobs.map((j) => (
          <div key={j.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Copy className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{j.issue}</span>
                <span className="text-sm font-medium text-slate-600">{j.fromProject}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-900">{j.toProject}</span>
              </div>
            </div>
            <button onClick={() => remove(j.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
