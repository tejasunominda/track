import { useMemo, useState } from "react";
import { Clock, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function TimeTrackingPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "tt-1", issue: "i-1", description: "Auth setup", minutes: 120 },
    { id: "tt-2", issue: "i-2", description: "Board review", minutes: 45 },
  ]);
  const [issue, setIssue] = useState("");
  const [minutes, setMinutes] = useState("");
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);

  const total = useMemo(() => items.reduce((s, i) => s + i.minutes, 0), [items]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim() || !minutes.trim()) return;
    setItems((prev) => [...prev, { id: `tt-${Date.now()}`, issue, description: desc, minutes: parseInt(minutes) }]);
    setIssue("");
    setMinutes("");
    setDesc("");
    setShow(false);
    notify("Time logged");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Time tracking</h1>
          <p className="text-sm text-slate-500">Total: {Math.round(total / 60 * 10) / 10}h</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Log time
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-4">
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue ID" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Minutes" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Log</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.description || i.issue}</div>
                <div className="text-xs text-slate-500">{i.minutes} minutes</div>
              </div>
            </div>
            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">{i.issue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
