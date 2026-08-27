import { useState } from "react";
import { Zap, Plus, Trash2, Play } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Rule { id: string; name: string; trigger: string; action: string; enabled: boolean; runs: number; }

export function RuleEnginePage() {
  const { notify } = useToast();
  const [rules, setRules] = useState<Rule[]>([
    { id: "rl-1", name: "Auto-assign bugs", trigger: "type = Bug", action: "assign to @bug-triage", enabled: true, runs: 142 },
    { id: "rl-2", name: "Close stale issues", trigger: "updated < -30d AND status != Done", action: "set status = Done", enabled: true, runs: 38 },
    { id: "rl-3", name: "High priority alert", trigger: "priority = Highest", action: "notify #engineering", enabled: false, runs: 0 },
  ]);
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [action, setAction] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setRules((p) => [...p, { id: `rl-${Date.now()}`, name, trigger, action, enabled: false, runs: 0 }]);
    setName(""); setTrigger(""); setAction(""); setShow(false); notify("Rule created");
  };
  const toggle = (id: string) => {
    setRules((p) => p.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
    notify("Rule toggled");
  };
  const run = (id: string) => {
    setRules((p) => p.map((r) => (r.id === id ? { ...r, runs: r.runs + 1 } : r)));
    notify("Rule executed");
  };
  const remove = (id: string) => { setRules((p) => p.filter((r) => r.id !== id)); notify("Rule deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rule engine</h1>
          <p className="text-sm text-slate-500">{rules.filter((r) => r.enabled).length} enabled · {rules.reduce((s, r) => s + r.runs, 0)} total runs</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New rule
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rule name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="Trigger (e.g. type = Bug)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" />
          <input value={action} onChange={(e) => setAction(e.target.value)} placeholder="Action (e.g. assign to @team)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-3">
        {rules.map((r) => (
          <div key={r.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-md ${r.enabled ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" : "bg-slate-200 text-slate-400"}`}><Zap className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.runs} runs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => run(r.id)} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-200"><Play className="h-3.5 w-3.5" /> Run</button>
                <button onClick={() => toggle(r.id)} className={`relative h-6 w-11 rounded-full transition-all ${r.enabled ? "bg-green-500" : "bg-slate-300"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${r.enabled ? "left-[22px]" : "left-0.5"}`} />
                </button>
                <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-2.5"><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">Trigger</div><code className="font-mono text-xs text-blue-700">{r.trigger || "—"}</code></div>
              <div className="rounded-lg bg-slate-50 p-2.5"><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">Action</div><code className="font-mono text-xs text-green-700">{r.action || "—"}</code></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
