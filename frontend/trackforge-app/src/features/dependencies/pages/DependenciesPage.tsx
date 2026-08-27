import { useState } from "react";
import { GitBranch, Plus, Trash2, ArrowRight, ArrowLeft, Link2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Dep { id: string; from: string; to: string; type: "blocks" | "is blocked by" | "relates to" | "duplicates"; }

export function DependenciesPage() {
  const { notify } = useToast();
  const [deps, setDeps] = useState<Dep[]>([
    { id: "d-1", from: "ENG-1", to: "ENG-3", type: "blocks" },
    { id: "d-2", from: "ENG-2", to: "ENG-1", type: "is blocked by" },
    { id: "d-3", from: "ENG-4", to: "ENG-1", type: "relates to" },
    { id: "d-4", from: "ENG-5", to: "ENG-2", type: "duplicates" },
  ]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState<Dep["type"]>("blocks");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    setDeps((p) => [...p, { id: `d-${Date.now()}`, from, to, type }]);
    setFrom(""); setTo(""); setShow(false); notify("Dependency added");
  };
  const remove = (id: string) => { setDeps((p) => p.filter((d) => d.id !== id)); notify("Dependency removed"); };

  const tColor = { blocks: "text-red-600", "is blocked by": "text-orange-600", "relates to": "text-blue-600", duplicates: "text-purple-600" };
  const tBg = { blocks: "bg-red-50", "is blocked by": "bg-orange-50", "relates to": "bg-blue-50", duplicates: "bg-purple-50" };

  // Build adjacency
  const nodes = [...new Set([...deps.flatMap((d) => [d.from, d.to])])];

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dependencies</h1>
          <p className="text-sm text-slate-500">{deps.length} links · {nodes.length} issues</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New dependency
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_1fr_auto]">
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value as Dep["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>blocks</option><option>is blocked by</option><option>relates to</option><option>duplicates</option>
          </select>
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To (e.g. ENG-2)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="space-y-2">
        {deps.map((d) => (
          <div key={d.id} className={`group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md ${tBg[d.type]}`}>
            <div className="flex items-center gap-3">
              <GitBranch className={`h-5 w-5 ${tColor[d.type]}`} />
              <span className="rounded bg-slate-900 px-2 py-1 font-mono text-xs font-bold text-white">{d.from}</span>
              <div className="flex items-center gap-1">
                <span className={`text-xs font-bold ${tColor[d.type]}`}>{d.type}</span>
                {d.type === "blocks" ? <ArrowRight className={`h-4 w-4 ${tColor[d.type]}`} /> : d.type === "is blocked by" ? <ArrowLeft className={`h-4 w-4 ${tColor[d.type]}`} /> : <Link2 className={`h-4 w-4 ${tColor[d.type]}`} />}
              </div>
              <span className="rounded bg-slate-900 px-2 py-1 font-mono text-xs font-bold text-white">{d.to}</span>
            </div>
            <button onClick={() => remove(d.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
