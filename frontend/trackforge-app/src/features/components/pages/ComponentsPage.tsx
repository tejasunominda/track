import { useState } from "react";
import { Boxes, Plus, Trash2, User } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Component { id: string; name: string; lead: string; description: string; issues: number; }

export function ComponentsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Component[]>([
    { id: "c-1", name: "Frontend", lead: "Alice", description: "React UI and client-side logic", issues: 42 },
    { id: "c-2", name: "Backend API", lead: "Bob", description: "Spring Boot REST services", issues: 68 },
    { id: "c-3", name: "Database", lead: "Charlie", description: "PostgreSQL and migrations", issues: 15 },
    { id: "c-4", name: "Infrastructure", lead: "Dana", description: "Docker, K8s, CI/CD", issues: 23 },
  ]);
  const [name, setName] = useState("");
  const [lead, setLead] = useState("");
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `c-${Date.now()}`, name, lead, description: desc, issues: 0 }]);
    setName(""); setLead(""); setDesc(""); setShow(false); notify("Component created");
  };
  const remove = (id: string) => { setItems((p) => p.filter((c) => c.id !== id)); notify("Component deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Components</h1>
          <p className="text-sm text-slate-500">{items.length} components · {items.reduce((s, c) => s + c.issues, 0)} issues</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New component
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_2fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Component name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={lead} onChange={(e) => setLead(e.target.value)} placeholder="Component lead" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-md"><Boxes className="h-5 w-5" /></div>
                <span className="font-bold text-slate-900">{c.name}</span>
              </div>
              <button onClick={() => remove(c.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mb-3 text-sm text-slate-600">{c.description || "No description"}</p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500"><User className="h-3.5 w-3.5" /> {c.lead || "Unassigned"}</div>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">{c.issues} issues</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
