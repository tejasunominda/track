import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function CalendarPage() {
  const { notify } = useToast();
  const [events, setEvents] = useState([
    { id: "e-1", title: "Sprint planning", date: "2025-04-10", time: "10:00" },
    { id: "e-2", title: "Retrospective", date: "2025-04-12", time: "14:00" },
  ]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !time.trim()) return;
    setEvents((prev) => [...prev, { id: `e-${Date.now()}`, title, date, time }]);
    setTitle("");
    setDate("");
    setTime("");
    setShow(false);
    notify("Event created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New event
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {events.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3 w-3" /> {i.date} {i.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
