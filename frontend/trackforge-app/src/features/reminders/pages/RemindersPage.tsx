import { useState } from "react";
import { Bell, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function RemindersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "r-1", title: "Due tomorrow", when: "Tomorrow", done: false },
    { id: "r-2", title: "Follow up", when: "Next week", done: true },
  ]);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !when.trim()) return;
    setItems((prev) => [...prev, { id: `r-${Date.now()}`, title, when, done: false }]);
    setTitle("");
    setWhen("");
    setShow(false);
    notify("Reminder created");
  };

  const done = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: true } : i)));
    notify("Reminder completed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Reminders</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reminder" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="When" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className={`flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50 ${i.done ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">{i.when}</div>
              </div>
            </div>
            {!i.done && (
              <button onClick={() => done(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Done</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
