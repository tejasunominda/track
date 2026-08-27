import { useState } from "react";
import { Layout, Plus, Trash2, GripVertical, BarChart3, Clock, List, TrendingUp } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Widget { id: string; type: string; title: string; x: number; y: number; w: number; h: number; }

const WIDGET_TYPES = [
  { type: "Chart", icon: BarChart3, color: "from-blue-500 to-indigo-600" },
  { type: "Stats", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
  { type: "List", icon: List, color: "from-amber-500 to-orange-500" },
  { type: "Timeline", icon: Clock, color: "from-purple-500 to-pink-500" },
];

export function DashboardBuilderPage() {
  const { notify } = useToast();
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "w-1", type: "Stats", title: "Open issues", x: 0, y: 0, w: 1, h: 1 },
    { id: "w-2", type: "Chart", title: "Sprint velocity", x: 1, y: 0, w: 2, h: 1 },
    { id: "w-3", type: "List", title: "Recent activity", x: 0, y: 1, w: 1, h: 2 },
  ]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Chart");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setWidgets((p) => [...p, { id: `w-${Date.now()}`, type, title, x: 0, y: p.length, w: 1, h: 1 }]);
    setTitle(""); setShow(false); notify("Widget added");
  };
  const remove = (id: string) => { setWidgets((p) => p.filter((w) => w.id !== id)); notify("Widget removed"); };
  const resize = (id: string, dw: number) => {
    setWidgets((p) => p.map((w) => (w.id === id ? { ...w, w: Math.max(1, Math.min(4, w.w + dw)) } : w)));
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard builder</h1>
          <p className="text-sm text-slate-500">{widgets.length} widgets · drag to rearrange</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> Add widget
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Widget title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            {WIDGET_TYPES.map((w) => <option key={w.type}>{w.type}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="grid grid-cols-4 gap-3">
        {widgets.map((w) => {
          const wt = WIDGET_TYPES.find((t) => t.type === w.type) ?? WIDGET_TYPES[0];
          const Icon = wt.icon;
          return (
            <div key={w.id} style={{ gridColumn: `span ${w.w}` }} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 cursor-grab text-slate-300" />
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${wt.color} text-white shadow-md`}><Icon className="h-4 w-4" /></div>
                  <span className="font-bold text-slate-900">{w.title}</span>
                </div>
                <button onClick={() => remove(w.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="flex h-24 items-center justify-center rounded-lg bg-slate-50 text-xs text-slate-400">
                <Layout className="mr-1 h-4 w-4" /> {w.type} preview
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Width: {w.w}/4</span>
                <div className="flex gap-1">
                  <button onClick={() => resize(w.id, -1)} className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-600 hover:bg-slate-200">−</button>
                  <button onClick={() => resize(w.id, 1)} className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-600 hover:bg-slate-200">+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
