import { useState } from "react";
import { BookOpen, Plus, Trash2, CheckCircle2, Circle, Play } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Runbook { id: string; name: string; steps: { id: string; text: string; done: boolean }[]; }

export function RunbooksPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Runbook[]>([
    { id: "rb-1", name: "Deploy to production", steps: [
      { id: "s1", text: "Run full test suite", done: false },
      { id: "s2", text: "Create release tag", done: false },
      { id: "s3", text: "Deploy via CI", done: false },
      { id: "s4", text: "Verify health checks", done: false },
    ]},
    { id: "rb-2", name: "Rollback deployment", steps: [
      { id: "s5", text: "Identify last stable version", done: false },
      { id: "s6", text: "Trigger rollback job", done: false },
    ]},
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `rb-${Date.now()}`, name, steps: [] }]);
    setName(""); setShow(false); notify("Runbook created");
  };
  const addStep = (rbId: string, text: string) => {
    if (!text.trim()) return;
    setItems((p) => p.map((r) => (r.id === rbId ? { ...r, steps: [...r.steps, { id: `s-${Date.now()}`, text, done: false }] } : r)));
  };
  const toggle = (rbId: string, sid: string) => {
    setItems((p) => p.map((r) => (r.id === rbId ? { ...r, steps: r.steps.map((s) => (s.id === sid ? { ...s, done: !s.done } : s)) } : r)));
  };
  const reset = (rbId: string) => {
    setItems((p) => p.map((r) => (r.id === rbId ? { ...r, steps: r.steps.map((s) => ({ ...s, done: false })) } : r)));
    notify("Runbook reset");
  };
  const remove = (id: string) => { setItems((p) => p.filter((r) => r.id !== id)); notify("Runbook deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Runbooks</h1>
          <p className="text-sm text-slate-500">{items.length} runbooks</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New runbook
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Runbook name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((r) => {
          const done = r.steps.filter((s) => s.done).length;
          const pct = r.steps.length ? Math.round((done / r.steps.length) * 100) : 0;
          return (
            <div key={r.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md"><BookOpen className="h-4 w-4" /></div>
                  <span className="font-bold text-slate-900">{r.name}</span>
                </div>
                <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="mb-3 space-y-1">
                {r.steps.map((s) => (
                  <button key={s.id} onClick={() => toggle(r.id, s.id)} className="flex w-full items-center gap-2 rounded-lg p-1.5 text-left transition-all hover:bg-slate-50">
                    {s.done ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-slate-400" />}
                    <span className={`text-sm ${s.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{s.text}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <AddStep onAdd={(t) => addStep(r.id, t)} />
                <button onClick={() => reset(r.id)} className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"><Play className="h-3 w-3" /> Reset</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddStep({ onAdd }: { onAdd: (t: string) => void }) {
  const [v, setV] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd(v); setV(""); }} className="flex flex-1 gap-1">
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Add step..." className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
      <button type="submit" className="rounded-lg bg-slate-100 px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200"><Plus className="h-4 w-4" /></button>
    </form>
  );
}
