import { useState } from "react";
import { Zap, Plus, Trash2, Play, Copy } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Macro { id: string; name: string; actions: string; runs: number; }

export function MacrosPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Macro[]>([
    { id: "m-1", name: "Assign to me", actions: "set assignee = currentUser()", runs: 42 },
    { id: "m-2", name: "Close & comment", actions: "set status = Done; add comment 'Closed automatically'", runs: 18 },
  ]);
  const [name, setName] = useState("");
  const [actions, setActions] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `m-${Date.now()}`, name, actions, runs: 0 }]);
    setName(""); setActions(""); setShow(false); notify("Macro created");
  };
  const run = (id: string) => {
    setItems((p) => p.map((m) => (m.id === id ? { ...m, runs: m.runs + 1 } : m)));
    notify("Macro executed");
  };
  const remove = (id: string) => { setItems((p) => p.filter((m) => m.id !== id)); notify("Macro deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Macros</h1>
          <p className="text-sm text-slate-500">{items.length} macros · {items.reduce((s, m) => s + m.runs, 0)} total runs</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New macro
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Macro name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <textarea value={actions} onChange={(e) => setActions(e.target.value)} placeholder="Actions (e.g. set status = Done; add comment '...')" rows={3} className="resize-none rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-3">
        {items.map((m) => (
          <div key={m.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md"><Zap className="h-5 w-5" /></div>
              <div>
                <div className="font-bold text-slate-900">{m.name}</div>
                <div className="flex items-center gap-1 font-mono text-xs text-slate-500"><Copy className="h-3 w-3" /> {m.actions}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">{m.runs} runs</span>
              <button onClick={() => run(m.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition-all hover:scale-105 hover:bg-green-200"><Play className="h-3.5 w-3.5" /> Run</button>
              <button onClick={() => remove(m.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
