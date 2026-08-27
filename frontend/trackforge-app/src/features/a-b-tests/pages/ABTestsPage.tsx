import { useState } from "react";
import { FlaskConical, Plus, Trash2, Play, StopCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Experiment { id: string; name: string; variantA: string; variantB: string; status: "Draft" | "Running" | "Completed"; winner: string | null; }

export function ABTestsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Experiment[]>([
    { id: "ab-1", name: "CTA button color", variantA: "Blue", variantB: "Green", status: "Running", winner: null },
    { id: "ab-2", name: "Onboarding flow", variantA: "3 steps", variantB: "5 steps", status: "Completed", winner: "3 steps" },
  ]);
  const [name, setName] = useState("");
  const [vA, setVA] = useState("");
  const [vB, setVB] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `ab-${Date.now()}`, name, variantA: vA, variantB: vB, status: "Draft", winner: null }]);
    setName(""); setVA(""); setVB(""); setShow(false); notify("Experiment created");
  };
  const start = (id: string) => { setItems((p) => p.map((e) => (e.id === id ? { ...e, status: "Running" } : e))); notify("Experiment started"); };
  const stop = (id: string) => {
    setItems((p) => p.map((e) => (e.id === id ? { ...e, status: "Completed", winner: Math.random() > 0.5 ? e.variantA : e.variantB } : e)));
    notify("Experiment completed");
  };
  const remove = (id: string) => { setItems((p) => p.filter((e) => e.id !== id)); notify("Experiment deleted"); };

  const sColor = { Draft: "bg-slate-100 text-slate-600", Running: "bg-green-100 text-green-700", Completed: "bg-blue-100 text-blue-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">A/B tests</h1>
          <p className="text-sm text-slate-500">{items.filter((e) => e.status === "Running").length} running</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New experiment
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Experiment name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={vA} onChange={(e) => setVA(e.target.value)} placeholder="Variant A" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={vB} onChange={(e) => setVB(e.target.value)} placeholder="Variant B" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-3">
        {items.map((e) => (
          <div key={e.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md"><FlaskConical className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-slate-900">{e.name}</div>
                  {e.winner && <div className="flex items-center gap-1 text-xs text-green-600"><TrendingUp className="h-3 w-3" /> Winner: {e.winner}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[e.status]}`}>{e.status}</span>
                {e.status === "Draft" && <button onClick={() => start(e.id)} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 hover:bg-green-200"><Play className="h-3.5 w-3.5" /> Start</button>}
                {e.status === "Running" && <button onClick={() => stop(e.id)} className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-200"><StopCircle className="h-3.5 w-3.5" /> End</button>}
                <button onClick={() => remove(e.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-lg border-2 p-3 text-center ${e.winner === e.variantA ? "border-green-500 bg-green-50" : "border-slate-200"}`}>
                <div className="text-xs font-bold text-slate-500">VARIANT A</div>
                <div className="text-sm font-bold text-slate-900">{e.variantA || "—"}</div>
              </div>
              <div className={`rounded-lg border-2 p-3 text-center ${e.winner === e.variantB ? "border-green-500 bg-green-50" : "border-slate-200"}`}>
                <div className="text-xs font-bold text-slate-500">VARIANT B</div>
                <div className="text-sm font-bold text-slate-900">{e.variantB || "—"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
