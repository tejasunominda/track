import { useState } from "react";
import { Calendar, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Task { id: string; name: string; start: number; duration: number; color: string; }

const COLORS = ["from-blue-500 to-indigo-600", "from-green-500 to-emerald-600", "from-amber-500 to-orange-500", "from-purple-500 to-pink-500", "from-red-500 to-rose-600"];
const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

export function TimelinePage() {
  const { notify } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "tl-1", name: "Design phase", start: 0, duration: 2, color: COLORS[0] },
    { id: "tl-2", name: "Backend API", start: 1, duration: 3, color: COLORS[1] },
    { id: "tl-3", name: "Frontend build", start: 2, duration: 4, color: COLORS[2] },
    { id: "tl-4", name: "Testing", start: 5, duration: 2, color: COLORS[3] },
    { id: "tl-5", name: "Deployment", start: 7, duration: 1, color: COLORS[4] },
  ]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(2);
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setTasks((p) => [...p, { id: `tl-${Date.now()}`, name, start: 0, duration, color: COLORS[p.length % COLORS.length] }]);
    setName(""); setDuration(2); setShow(false); notify("Task added to timeline");
  };
  const shift = (id: string, dir: number) => {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, start: Math.max(0, Math.min(WEEKS.length - t.duration, t.start + dir)) } : t)));
  };
  const remove = (id: string) => { setTasks((p) => p.filter((t) => t.id !== id)); notify("Task removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Timeline</h1>
          <p className="text-sm text-slate-500">{tasks.length} tasks · {WEEKS.length} weeks</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New task
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={duration} min={1} max={8} onChange={(e) => setDuration(Number(e.target.value))} className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid border-b border-slate-200 bg-slate-50" style={{ gridTemplateColumns: `200px repeat(${WEEKS.length}, 1fr)` }}>
          <div className="p-3 text-xs font-bold uppercase text-slate-500">Task</div>
          {WEEKS.map((w) => <div key={w} className="border-l border-slate-200 p-3 text-center text-xs font-bold text-slate-500">{w}</div>)}
        </div>
        {tasks.map((t) => (
          <div key={t.id} className="group grid border-b border-slate-100 transition-all hover:bg-slate-50" style={{ gridTemplateColumns: `200px repeat(${WEEKS.length}, 1fr)` }}>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-900">{t.name}</span>
              </div>
              <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
            <div className="relative col-span-8 border-l border-slate-100" style={{ gridColumnStart: 2, gridColumnEnd: WEEKS.length + 2 }}>
              <div className="relative flex h-full items-center" style={{ paddingLeft: `${(t.start / WEEKS.length) * 100}%` }}>
                <div className="group/bar flex w-full items-center">
                  <button onClick={() => shift(t.id, -1)} className="rounded-l-lg bg-slate-200 p-1 text-slate-500 opacity-0 transition-all hover:bg-slate-300 group-hover/bar:opacity-100"><ChevronLeft className="h-3 w-3" /></button>
                  <div className={`flex h-8 items-center justify-center rounded-lg bg-gradient-to-r ${t.color} px-3 text-xs font-bold text-white shadow-md transition-all hover:brightness-110`} style={{ width: `${(t.duration / WEEKS.length) * 100 * 8}%`, minWidth: "60px" }}>
                    {t.duration}w
                  </div>
                  <button onClick={() => shift(t.id, 1)} className="rounded-r-lg bg-slate-200 p-1 text-slate-500 opacity-0 transition-all hover:bg-slate-300 group-hover/bar:opacity-100"><ChevronRight className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
