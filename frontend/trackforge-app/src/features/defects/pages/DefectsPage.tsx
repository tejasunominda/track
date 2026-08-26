import { useState } from "react";
import { Bug, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function DefectsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "de-1", name: "Minor layout issue", severity: "Minor", status: "Open" },
    { id: "de-2", name: "Crash on save", severity: "Major", status: "Fixed" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `de-${Date.now()}`, name, severity: "Minor", status: "Open" }]);
    setName("");
    setShow(false);
    notify("Defect created");
  };

  const fix = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Fixed" } : i)));
    notify("Defect fixed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Defects</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Defect name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Bug className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.severity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Fixed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{i.status}</span>
              {i.status !== "Fixed" && (
                <button onClick={() => fix(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Fix</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
