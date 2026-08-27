import { useState } from "react";
import { LayoutTemplate, Plus, Trash2, Copy, Check } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Template { id: string; name: string; type: "Scrum" | "Kanban" | "Bug Tracking" | "Service Desk"; issueTypes: number; workflows: number; inUse: boolean; }

export function TemplatesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Template[]>([
    { id: "tp-1", name: "Scrum project", type: "Scrum", issueTypes: 5, workflows: 3, inUse: true },
    { id: "tp-2", name: "Kanban board", type: "Kanban", issueTypes: 3, workflows: 1, inUse: true },
    { id: "tp-3", name: "Bug tracker", type: "Bug Tracking", issueTypes: 2, workflows: 2, inUse: false },
    { id: "tp-4", name: "IT service desk", type: "Service Desk", issueTypes: 4, workflows: 4, inUse: false },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Template["type"]>("Scrum");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `tp-${Date.now()}`, name, type, issueTypes: 3, workflows: 2, inUse: false }]);
    setName(""); setShow(false); notify("Template created");
  };
  const duplicate = (t: Template) => {
    setItems((p) => [...p, { ...t, id: `tp-${Date.now()}`, name: `${t.name} (copy)`, inUse: false }]);
    notify("Template duplicated");
  };
  const remove = (id: string) => { setItems((p) => p.filter((t) => t.id !== id)); notify("Template deleted"); };

  const tColor = { Scrum: "from-blue-500 to-indigo-600", Kanban: "from-green-500 to-emerald-600", "Bug Tracking": "from-red-500 to-rose-600", "Service Desk": "from-purple-500 to-pink-500" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
          <p className="text-sm text-slate-500">{items.length} project templates</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New template
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value as Template["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Scrum</option><option>Kanban</option><option>Bug Tracking</option><option>Service Desk</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <div key={t.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className={`flex h-24 items-center justify-center bg-gradient-to-br ${tColor[t.type]}`}>
              <LayoutTemplate className="h-8 w-8 text-white/80" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-slate-900">{t.name}</span>
                {t.inUse && <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700"><Check className="h-3 w-3" /> In use</span>}
              </div>
              <div className="mb-3 text-xs text-slate-500">{t.type}</div>
              <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2 text-center"><div className="font-bold text-slate-900">{t.issueTypes}</div><div className="text-slate-400">issue types</div></div>
                <div className="rounded-lg bg-slate-50 p-2 text-center"><div className="font-bold text-slate-900">{t.workflows}</div><div className="text-slate-400">workflows</div></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => duplicate(t)} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200"><Copy className="h-3.5 w-3.5" /> Duplicate</button>
                <button onClick={() => remove(t.id)} className="rounded-lg bg-slate-100 px-2 py-1.5 text-slate-500 transition-all hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
