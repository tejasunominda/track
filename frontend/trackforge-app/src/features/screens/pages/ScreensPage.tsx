import { useState } from "react";
import { Layout, Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Screen { id: string; name: string; operation: "Create" | "Edit" | "View"; fields: string[]; }

const ALL_FIELDS = ["Summary", "Description", "Assignee", "Priority", "Labels", "Sprint", "Story Points", "Due Date"];

export function ScreensPage() {
  const { notify } = useToast();
  const [screens, setScreens] = useState<Screen[]>([
    { id: "sc-1", name: "Story create", operation: "Create", fields: ["Summary", "Description", "Assignee", "Priority"] },
    { id: "sc-2", name: "Bug edit", operation: "Edit", fields: ["Summary", "Description", "Priority", "Labels"] },
  ]);
  const [name, setName] = useState("");
  const [op, setOp] = useState<Screen["operation"]>("Create");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setScreens((p) => [...p, { id: `sc-${Date.now()}`, name, operation: op, fields: ["Summary", "Description"] }]);
    setName(""); setShow(false); notify("Screen created");
  };
  const toggleField = (id: string, field: string) => {
    setScreens((p) => p.map((s) => (s.id === id ? { ...s, fields: s.fields.includes(field) ? s.fields.filter((f) => f !== field) : [...s.fields, field] } : s)));
  };
  const remove = (id: string) => { setScreens((p) => p.filter((s) => s.id !== id)); notify("Screen deleted"); };

  const opColor = { Create: "bg-green-100 text-green-700", Edit: "bg-blue-100 text-blue-700", View: "bg-slate-100 text-slate-600" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Screens</h1>
          <p className="text-sm text-slate-500">{screens.length} screen configurations</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New screen
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Screen name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={op} onChange={(e) => setOp(e.target.value as Screen["operation"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Create</option><option>Edit</option><option>View</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-4">
        {screens.map((s) => (
          <div key={s.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md"><Layout className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-slate-900">{s.name}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${opColor[s.operation]}`}>{s.operation}</span>
                </div>
              </div>
              <button onClick={() => remove(s.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_FIELDS.map((f) => {
                const on = s.fields.includes(f);
                return (
                  <button key={f} onClick={() => toggleField(s.id, f)} className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 ${on ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-500"}`}>
                    {on && <ArrowRight className="h-3 w-3" />} {f}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
