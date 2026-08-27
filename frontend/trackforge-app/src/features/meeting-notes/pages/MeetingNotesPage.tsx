import { useState } from "react";
import { NotepadText, Plus, Trash2, Search, Users, Calendar, CheckSquare } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface MeetingNote { id: string; title: string; date: string; attendees: number; actions: number; }

export function MeetingNotesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<MeetingNote[]>([
    { id: "mn-1", title: "Retro notes", date: "2025-04-01", attendees: 8, actions: 5 },
    { id: "mn-2", title: "Sprint plan", date: "2025-04-02", attendees: 6, actions: 12 },
    { id: "mn-3", title: "Architecture review", date: "2025-04-05", attendees: 4, actions: 3 },
  ]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim() || !date.trim()) return; setItems((p) => [...p, { id: `mn-${Date.now()}`, title, date, attendees: 0, actions: 0 }]); setTitle(""); setDate(""); setShow(false); notify("Note saved"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Note deleted"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.date.includes(search));
  const totalActions = items.reduce((s, i) => s + i.actions, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Meeting notes</h1><p className="text-sm text-slate-500">{items.length} notes · {totalActions} action items</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New note</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search meeting notes..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><NotepadText className="h-5 w-5" /></div>
              <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="font-bold text-slate-900">{i.title}</div>
            <div className="mb-3 flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" /> {i.date}</div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-blue-500" /><div><div className="text-sm font-bold text-slate-900">{i.attendees}</div><div className="text-[10px] text-slate-400">Attendees</div></div></div>
              <div className="flex items-center gap-1"><CheckSquare className="h-3.5 w-3.5 text-green-500" /><div><div className="text-sm font-bold text-slate-900">{i.actions}</div><div className="text-[10px] text-slate-400">Actions</div></div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
