import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function CareerPathPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "cp-1", role: "Junior", next: "Senior" },
    { id: "cp-2", role: "Senior", next: "Staff" },
  ]);
  const [role, setRole] = useState("");
  const [next, setNext] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !next.trim()) return;
    setItems((prev) => [...prev, { id: `cp-${Date.now()}`, role, next }]);
    setRole("");
    setNext("");
    setShow(false);
    notify("Career step added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Career path</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New step
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={next} onChange={(e) => setNext(e.target.value)} placeholder="Next" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <ArrowRight className="h-5 w-5 text-slate-400" />
              <div className="font-medium text-slate-900">{i.role}</div>
            </div>
            <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">→ {i.next}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
