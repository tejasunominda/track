import { useState } from "react";
import { Users, Plus, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Alloc { id: string; person: string; project: string; allocation: number; role: string; }

export function ResourcePlanningPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Alloc[]>([
    { id: "rp-1", person: "Alice", project: "Engineering", allocation: 80, role: "Lead" },
    { id: "rp-2", person: "Bob", project: "Marketing", allocation: 50, role: "Developer" },
    { id: "rp-3", person: "Charlie", project: "Engineering", allocation: 100, role: "Developer" },
    { id: "rp-4", person: "Dana", project: "Design", allocation: 40, role: "Designer" },
  ]);
  const [person, setPerson] = useState("");
  const [project, setProject] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!person.trim()) return;
    setItems((p) => [...p, { id: `rp-${Date.now()}`, person, project, allocation: 100, role: "Developer" }]);
    setPerson(""); setProject(""); setShow(false); notify("Allocation added");
  };
  const setAlloc = (id: string, val: number) => {
    setItems((p) => p.map((a) => (a.id === id ? { ...a, allocation: val } : a)));
  };
  const remove = (id: string) => { setItems((p) => p.filter((a) => a.id !== id)); notify("Allocation removed"); };

  const byPerson = items.reduce<Record<string, Alloc[]>>((acc, a) => { (acc[a.person] ??= []).push(a); return acc; }, {});

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resource planning</h1>
          <p className="text-sm text-slate-500">{Object.keys(byPerson).length} people allocated</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New allocation
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Project" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="space-y-4">
        {Object.entries(byPerson).map(([person, allocs]) => {
          const total = allocs.reduce((s, a) => s + a.allocation, 0);
          const over = total > 100;
          return (
            <div key={person} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Users className="h-4 w-4" /></div>
                  <span className="font-bold text-slate-900">{person}</span>
                </div>
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${over ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  <TrendingUp className="h-3 w-3" /> {total}% {over ? "OVER" : "allocated"}
                </span>
              </div>
              <div className="space-y-2">
                {allocs.map((a) => (
                  <div key={a.id} className="group flex items-center gap-3">
                    <span className="w-32 text-sm font-medium text-slate-700">{a.project}</span>
                    <input type="range" min={0} max={100} value={a.allocation} onChange={(e) => setAlloc(a.id, Number(e.target.value))} className="flex-1 accent-blue-600" />
                    <span className="w-12 text-right text-sm font-bold text-slate-700">{a.allocation}%</span>
                    <button onClick={() => remove(a.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
