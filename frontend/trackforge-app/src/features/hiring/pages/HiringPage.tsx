import { useState } from "react";
import { Briefcase, Plus, ThumbsUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function HiringPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "h-1", role: "Frontend engineer", candidates: 4, status: "Open" },
    { id: "h-2", role: "Product designer", candidates: 2, status: "Open" },
  ]);
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;
    setItems((prev) => [...prev, { id: `h-${Date.now()}`, role, candidates: 0, status: "Open" }]);
    setRole("");
    setShow(false);
    notify("Requisition created");
  };

  const hire = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Filled" } : i)));
    notify("Requisition filled");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Hiring</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New req
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.role}</div>
                <div className="text-xs text-slate-500">{i.candidates} candidates</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Filled" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{i.status}</span>
              {i.status !== "Filled" && (
                <button onClick={() => hire(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                  <ThumbsUp className="h-3 w-3" /> Fill
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
