import { useState } from "react";
import { NotepadText, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function MeetingNotesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "mn-1", title: "Retro notes", date: "2025-04-01" },
    { id: "mn-2", title: "Sprint plan", date: "2025-04-02" },
  ]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;
    setItems((prev) => [...prev, { id: `mn-${Date.now()}`, title, date }]);
    setTitle("");
    setDate("");
    setShow(false);
    notify("Note saved");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Meeting notes</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New note
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <NotepadText className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">{i.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
