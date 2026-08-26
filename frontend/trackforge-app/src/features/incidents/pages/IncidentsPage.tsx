import { useState } from "react";
import { AlertOctagon, Plus, ShieldCheck } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function IncidentsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "in-1", title: "API outage", severity: "Critical", status: "Open" },
    { id: "in-2", title: "Slow queries", severity: "Major", status: "Resolved" },
  ]);
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("Minor");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((prev) => [...prev, { id: `in-${Date.now()}`, title, severity, status: "Open" }]);
    setTitle("");
    setShow(false);
    notify("Incident created");
  };

  const resolve = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Resolved" } : i)));
    notify("Incident resolved");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Incidents</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New incident
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Incident title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <AlertOctagon className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">{i.severity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Resolved" ? "bg-green-100 text-green-700" : i.severity === "Critical" ? "bg-red-100 text-red-700" : i.severity === "Major" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"}`}>{i.status}</span>
              {i.status !== "Resolved" && (
                <button onClick={() => resolve(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                  <ShieldCheck className="h-3 w-3" /> Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
