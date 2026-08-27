import { useState } from "react";
import { Copy, Plus, Trash2, Check } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CloneJob { id: string; sourceIssue: string; newName: string; copyComments: boolean; copyLinks: boolean; copyAttachments: boolean; status: "Ready" | "Cloned"; }

export function ClonePage() {
  const { notify } = useToast();
  const [jobs, setJobs] = useState<CloneJob[]>([
    { id: "cj-1", sourceIssue: "ENG-1", newName: "ENG-1 (clone)", copyComments: true, copyLinks: false, copyAttachments: true, status: "Cloned" },
  ]);
  const [source, setSource] = useState("");
  const [newName, setNewName] = useState("");
  const [copyComments, setCopyComments] = useState(true);
  const [copyLinks, setCopyLinks] = useState(false);
  const [copyAttachments, setCopyAttachments] = useState(true);
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim()) return;
    setJobs((p) => [...p, { id: `cj-${Date.now()}`, sourceIssue: source, newName: newName || `${source} (clone)`, copyComments, copyLinks, copyAttachments, status: "Cloned" }]);
    setSource(""); setNewName(""); setShow(false); notify("Issue cloned successfully");
  };
  const remove = (id: string) => { setJobs((p) => p.filter((j) => j.id !== id)); notify("Clone record removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clone</h1>
          <p className="text-sm text-slate-500">{jobs.length} clone operations</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> Clone issue
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-500">Source issue</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. ENG-1" className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-500">New issue name</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Clone name" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">Copy options</label>
            {[["Comments", copyComments, setCopyComments], ["Links", copyLinks, setCopyLinks], ["Attachments", copyAttachments, setCopyAttachments]].map(([label, val, set]) => (
              <button key={label as string} type="button" onClick={() => (set as (v: boolean) => void)(!(val as boolean))} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${(val as boolean) ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-500"}`}>
                <div className={`flex h-5 w-5 items-center justify-center rounded ${(val as boolean) ? "bg-blue-600 text-white" : "bg-slate-200"}`}>{(val as boolean) && <Check className="h-3 w-3" />}</div>
                {label as string}
              </button>
            ))}
          </div>
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Clone now</button>
        </form>
      )}
      <div className="space-y-2">
        {jobs.map((j) => (
          <div key={j.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Copy className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{j.sourceIssue}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-bold text-slate-900">{j.newName}</span>
                </div>
                <div className="mt-1 flex gap-2 text-xs text-slate-500">
                  {j.copyComments && <span className="rounded bg-slate-100 px-1.5 py-0.5">Comments</span>}
                  {j.copyLinks && <span className="rounded bg-slate-100 px-1.5 py-0.5">Links</span>}
                  {j.copyAttachments && <span className="rounded bg-slate-100 px-1.5 py-0.5">Attachments</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700"><Check className="h-3 w-3" /> {j.status}</span>
              <button onClick={() => remove(j.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
