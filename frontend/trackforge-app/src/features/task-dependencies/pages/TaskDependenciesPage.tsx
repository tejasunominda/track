import { useState } from "react";
import { ArrowRight, Plus, Trash2, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Dep { id: string; from: string; to: string; type: "blocks" | "relates to" | "duplicates"; }

export function TaskDependenciesPage() {
  const { notify } = useToast();
  const [deps, setDeps] = useState<Dep[]>([
    { id: "d1", from: "ENG-1", to: "ENG-3", type: "blocks" },
    { id: "d2", from: "ENG-2", to: "ENG-4", type: "relates to" },
    { id: "d3", from: "ENG-5", to: "ENG-6", type: "duplicates" },
  ]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState<Dep["type"]>("blocks");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    setDeps((p) => [...p, { id: `d-${Date.now()}`, from, to, type }]);
    setFrom(""); setTo(""); setShow(false); notify("Dependency created");
  };
  const remove = (id: string) => { setDeps((p) => p.filter((d) => d.id !== id)); notify("Dependency removed"); };

  const tColor = { "blocks": "bg-red-100 text-red-700", "relates to": "bg-blue-100 text-blue-700", "duplicates": "bg-amber-100 text-amber-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task dependencies</h1>
          <p className="text-sm text-slate-500">{deps.length} links</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New dependency
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_1fr_auto]">
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono outline-none focus:border-blue-500" />
          <select value={type} onChange={(e) => setType(e.target.value as Dep["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>blocks</option><option>relates to</option><option>duplicates</option>
          </select>
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To (e.g. ENG-2)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="space-y-2">
        {deps.map((d) => (
          <div key={d.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-slate-900 px-2.5 py-1.5 font-mono text-sm font-bold text-white">{d.from}</span>
              <div className="flex flex-col items-center">
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <span className={`mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${tColor[d.type]}`}>{d.type}</span>
              </div>
              <span className="rounded-lg bg-slate-900 px-2.5 py-1.5 font-mono text-sm font-bold text-white">{d.to}</span>
            </div>
            <button onClick={() => remove(d.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {deps.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ArrowRightLeft className="mb-2 h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">No dependencies yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
