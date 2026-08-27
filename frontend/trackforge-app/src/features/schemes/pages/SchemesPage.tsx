import { useState } from "react";
import { Layers, Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Scheme { id: string; name: string; type: "Issue Type" | "Workflow" | "Screen" | "Field"; linkedTo: string; }

export function SchemesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Scheme[]>([
    { id: "sch-1", name: "Scrum Issue Type Scheme", type: "Issue Type", linkedTo: "Engineering" },
    { id: "sch-2", name: "Default Workflow Scheme", type: "Workflow", linkedTo: "All projects" },
    { id: "sch-3", name: "Bug Screen Scheme", type: "Screen", linkedTo: "Engineering" },
    { id: "sch-4", name: "Custom Field Scheme", type: "Field", linkedTo: "Marketing" },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Scheme["type"]>("Issue Type");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `sch-${Date.now()}`, name, type, linkedTo: "Unassigned" }]);
    setName(""); setShow(false); notify("Scheme created");
  };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Scheme deleted"); };

  const tColor = { "Issue Type": "bg-blue-100 text-blue-700", "Workflow": "bg-purple-100 text-purple-700", "Screen": "bg-amber-100 text-amber-700", "Field": "bg-green-100 text-green-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Schemes</h1>
          <p className="text-sm text-slate-500">{items.length} schemes configured</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New scheme
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Scheme name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value as Scheme["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Issue Type</option><option>Workflow</option><option>Screen</option><option>Field</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-2">
        {items.map((s) => (
          <div key={s.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-md"><Layers className="h-5 w-5" /></div>
              <div>
                <div className="font-bold text-slate-900">{s.name}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className={`rounded-full px-2 py-0.5 font-bold ${tColor[s.type]}`}>{s.type}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{s.linkedTo}</span>
                </div>
              </div>
            </div>
            <button onClick={() => remove(s.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
