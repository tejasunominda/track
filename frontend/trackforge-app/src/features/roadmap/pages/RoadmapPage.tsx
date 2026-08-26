import { useState } from "react";
import { Map, Plus, Target } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const quarters = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"];

const initialGoals = [
  { id: "g-1", name: "Launch MVP", quarter: "Q1 2025", status: "Done" },
  { id: "g-2", name: "Sprint support", quarter: "Q2 2025", status: "In progress" },
  { id: "g-3", name: "Enterprise SSO", quarter: "Q3 2025", status: "Planned" },
];

export function RoadmapPage() {
  const { notify } = useToast();
  const [goals, setGoals] = useState(initialGoals);
  const [name, setName] = useState("");
  const [quarter, setQuarter] = useState("Q1 2025");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setGoals((prev) => [...prev, { id: `g-${Date.now()}`, name, quarter, status: "Planned" }]);
    setName("");
    setShow(false);
    notify("Roadmap goal added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Roadmap</h1>
          <p className="text-sm text-slate-500">Quarterly goals and milestones.</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add goal
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Goal name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={quarter} onChange={(e) => setQuarter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            {quarters.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-6 lg:grid-cols-4">
        {quarters.map((q) => (
          <div key={q} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-bold text-slate-900"><Map className="h-4 w-4 text-slate-400" /> {q}</div>
            <div className="space-y-3">
              {goals.filter((g) => g.quarter === q).map((g) => (
                <div key={g.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-900"><Target className="h-3 w-3 text-blue-500" /> {g.name}</div>
                  <div className={`mt-1 text-[10px] font-bold uppercase ${g.status === "Done" ? "text-green-600" : g.status === "In progress" ? "text-blue-600" : "text-slate-500"}`}>{g.status}</div>
                </div>
              ))}
              {goals.filter((g) => g.quarter === q).length === 0 && (
                <div className="text-xs text-slate-400">No goals yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
