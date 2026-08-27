import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CalEvent { id: string; title: string; date: string; time: string; type: string; }

const tColor = { Meeting: "from-blue-500 to-indigo-600", Review: "from-purple-500 to-pink-500", Deadline: "from-red-500 to-rose-600", Social: "from-green-500 to-emerald-600" };

export function CalendarPage() {
  const { notify } = useToast();
  const [events, setEvents] = useState<CalEvent[]>([
    { id: "e-1", title: "Sprint planning", date: "2025-04-10", time: "10:00", type: "Meeting" },
    { id: "e-2", title: "Retrospective", date: "2025-04-12", time: "14:00", type: "Review" },
    { id: "e-3", title: "Feature freeze", date: "2025-04-15", time: "17:00", type: "Deadline" },
  ]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim() || !date.trim() || !time.trim()) return; setEvents((p) => [...p, { id: `e-${Date.now()}`, title, date, time, type: "Meeting" }]); setTitle(""); setDate(""); setTime(""); setShow(false); notify("Event created"); };
  const remove = (id: string) => { setEvents((p) => p.filter((e) => e.id !== id)); notify("Event removed"); };

  const filtered = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search)).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Calendar</h1><p className="text-sm text-slate-500">{events.length} upcoming events</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New event</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="relative pl-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200">
        {filtered.map((i) => (
          <div key={i.id} className="group relative mb-3">
            <span className={`absolute -left-4 top-3 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br ${tColor[i.type as keyof typeof tColor] || tColor.Meeting} ring-4 ring-slate-50`} />
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tColor[i.type as keyof typeof tColor] || tColor.Meeting} text-white shadow-md`}><CalendarIcon className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.title}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{i.type}</span></div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" /> {i.date} at {i.time}</div>
                </div>
              </div>
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
