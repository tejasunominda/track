import { useState } from "react";
import { PenSquare, Plus, Trash2, StickyNote } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Note { id: string; text: string; x: number; y: number; color: string; }

const COLORS = ["bg-yellow-200", "bg-green-200", "bg-blue-200", "bg-pink-200", "bg-purple-200"];

export function WhiteboardPage() {
  const { notify } = useToast();
  const [notes, setNotes] = useState<Note[]>([
    { id: "n-1", text: "Design review needed", x: 50, y: 50, color: COLORS[0] },
    { id: "n-2", text: "API endpoint spec", x: 250, y: 100, color: COLORS[1] },
    { id: "n-3", text: "Deploy by Friday", x: 100, y: 200, color: COLORS[2] },
  ]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setNotes((p) => [...p, { id: `n-${Date.now()}`, text, x: Math.random() * 400 + 50, y: Math.random() * 300 + 50, color: COLORS[p.length % COLORS.length] }]);
    setText(""); setShow(false); notify("Note added");
  };
  const update = (id: string, val: string) => setNotes((p) => p.map((n) => (n.id === id ? { ...n, text: val } : n)));
  const remove = (id: string) => { setNotes((p) => p.filter((n) => n.id !== id)); notify("Note removed"); };
  const move = (id: string, dx: number, dy: number) => setNotes((p) => p.map((n) => (n.id === id ? { ...n, x: Math.max(0, n.x + dx), y: Math.max(0, n.y + dy) } : n)));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Whiteboard</h1>
          <p className="text-sm text-slate-500">{notes.length} sticky notes</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New note
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Note text" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="relative h-[500px] overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white shadow-inner" style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        {notes.map((n) => (
          <div key={n.id} className={`group absolute w-48 rounded-lg ${n.color} p-3 shadow-md transition-all hover:shadow-lg`} style={{ left: n.x, top: n.y }}>
            <div className="mb-2 flex items-center justify-between">
              <StickyNote className="h-4 w-4 text-slate-500" />
              <button onClick={() => remove(n.id)} className="text-slate-400 opacity-0 transition-all hover:text-red-600 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
            <textarea value={n.text} onChange={(e) => update(n.id, e.target.value)} rows={3} className="w-full resize-none rounded bg-white/60 p-1.5 text-sm text-slate-800 outline-none focus:bg-white/90" />
            <div className="mt-2 flex gap-1 opacity-0 transition-all group-hover:opacity-100">
              <button onClick={() => move(n.id, -20, 0)} className="rounded bg-white/70 px-1.5 py-0.5 text-xs text-slate-600 hover:bg-white">←</button>
              <button onClick={() => move(n.id, 0, -20)} className="rounded bg-white/70 px-1.5 py-0.5 text-xs text-slate-600 hover:bg-white">↑</button>
              <button onClick={() => move(n.id, 0, 20)} className="rounded bg-white/70 px-1.5 py-0.5 text-xs text-slate-600 hover:bg-white">↓</button>
              <button onClick={() => move(n.id, 20, 0)} className="rounded bg-white/70 px-1.5 py-0.5 text-xs text-slate-600 hover:bg-white">→</button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <div className="flex h-full items-center justify-center text-slate-400"><div className="text-center"><PenSquare className="mx-auto mb-2 h-10 w-10" /><p className="text-sm">Click "New note" to start</p></div></div>}
      </div>
    </div>
  );
}
