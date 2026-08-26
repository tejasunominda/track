import { useState } from "react";
import { Mountain, Plus, Target } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function EpicsPage() {
  const { notify } = useToast();
  const [epics, setEpics] = useState([
    { id: "e-1", name: "Platform foundation", status: "In progress", progress: 60 },
    { id: "e-2", name: "User onboarding", status: "To do", progress: 0 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setEpics((prev) => [...prev, { id: `e-${Date.now()}`, name, status: "To do", progress: 0 }]);
    setName("");
    setShow(false);
    notify("Epic created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Epics</h1>
          <p className="text-sm text-slate-500">Large bodies of work.</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New epic
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Epic name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-4">
        {epics.map((e) => (
          <div key={e.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Mountain className="h-5 w-5 text-slate-400" /> {e.name}
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">{e.status}</span>
            </div>
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500"><Target className="h-3 w-3" /> {e.progress}% complete</div>
            <div className="h-2 w-full overflow-hidden rounded bg-slate-100">
              <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${e.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
