import { useState } from "react";
import { Calendar, Plus, Trash2, ArrowLeft, ArrowRight, Link2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface GanttTask { id: string; name: string; start: number; width: number; progress: number; color: string; dependsOn?: string; }

const COLORS = ["from-blue-500 to-indigo-600", "from-green-500 to-emerald-600", "from-amber-500 to-orange-500", "from-purple-500 to-pink-500", "from-red-500 to-rose-600"];

export function GanttPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<GanttTask[]>([
    { id: "t-1", name: "Design", start: 5, width: 25, progress: 80, color: COLORS[0] },
    { id: "t-2", name: "Develop", start: 28, width: 35, progress: 45, color: COLORS[1], dependsOn: "t-1" },
    { id: "t-3", name: "Test", start: 60, width: 20, progress: 10, color: COLORS[2], dependsOn: "t-2" },
    { id: "t-4", name: "Deploy", start: 78, width: 15, progress: 0, color: COLORS[3], dependsOn: "t-3" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [week, setWeek] = useState(0);

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `t-${Date.now()}`, name, start: Math.floor(Math.random() * 60), width: Math.floor(Math.random() * 25) + 10, progress: 0, color: COLORS[p.length % COLORS.length] }]); setName(""); setShow(false); notify("Task added"); };
  const remove = (id: string) => { setItems((p) => p.filter((t) => t.id !== id)); notify("Task removed"); };
  const shift = (id: string, dir: number) => setItems((p) => p.map((t) => t.id === id ? { ...t, start: Math.max(0, Math.min(85, t.start + dir * 5)) } : t));

  const weeks = Array.from({ length: 12 }).map((_, i) => `W${i + 1 + week}`);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Gantt</h1><p className="text-sm text-slate-500">{items.length} tasks · {items.filter((t) => t.progress === 100).length} completed</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeek((w) => Math.max(0, w - 4))} className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200"><ArrowLeft className="h-4 w-4" /></button>
          <span className="text-sm font-bold text-slate-600">Weeks {week + 1}–{week + 12}</span>
          <button onClick={() => setWeek((w) => w + 4)} className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200"><ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New task</button>
        </div>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <div className="w-40 shrink-0 px-4 py-2 text-xs font-bold uppercase text-slate-500">Task</div>
          <div className="flex flex-1">
            {weeks.map((w) => <div key={w} className="flex-1 border-l border-slate-200 px-1 py-2 text-center text-[10px] font-bold text-slate-400">{w}</div>)}
          </div>
        </div>
        {items.map((t) => (
          <div key={t.id} className="group flex border-b border-slate-100 transition-all hover:bg-slate-50">
            <div className="w-40 shrink-0 p-3">
              <div className="flex items-center gap-1.5">
                {t.dependsOn && <Link2 className="h-3 w-3 text-slate-400" />}
                <span className="truncate text-sm font-medium text-slate-900">{t.name}</span>
              </div>
              <div className="mt-0.5 text-xs text-slate-400">{t.progress}% done</div>
            </div>
            <div className="relative flex-1 p-3">
              <div className="relative h-8 w-full rounded-lg bg-slate-100">
                <div className={`group/bar absolute top-0 h-full rounded-lg bg-gradient-to-r ${t.color} shadow-sm transition-all hover:shadow-md`} style={{ marginLeft: `${t.start}%`, width: `${t.width}%` }}>
                  <div className="flex h-full items-center justify-between px-2">
                    <span className="truncate text-xs font-bold text-white">{t.name}</span>
                    <div className="flex gap-0.5 opacity-0 transition-all group-hover/bar:opacity-100">
                      <button onClick={() => shift(t.id, -1)} className="rounded bg-white/20 px-1 text-[10px] text-white hover:bg-white/30">←</button>
                      <button onClick={() => shift(t.id, 1)} className="rounded bg-white/20 px-1 text-[10px] text-white hover:bg-white/30">→</button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 rounded-b-lg bg-white/40" style={{ width: `${t.progress}%` }} />
                </div>
              </div>
              <button onClick={() => remove(t.id)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-slate-400"><Calendar className="mx-auto mb-2 h-10 w-10" />No tasks yet</div>}
      </div>
    </div>
  );
}
