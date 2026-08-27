import { useState } from "react";
import { Plus, Radio, Trash2, Search, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Standup { id: string; person: string; update: string; blocker: string; date: string; }

export function StandupsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Standup[]>([
    { id: "su-1", person: "Alice", update: "Working on API", blocker: "", date: "Today" },
    { id: "su-2", person: "Bob", update: "UI polish", blocker: "Waiting on design review", date: "Today" },
    { id: "su-3", person: "Charlie", update: "Fixing bugs in auth flow", blocker: "", date: "Today" },
  ]);
  const [person, setPerson] = useState("");
  const [update, setUpdate] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!person.trim() || !update.trim()) return; setItems((p) => [...p, { id: `su-${Date.now()}`, person, update, blocker: "", date: "Today" }]); setPerson(""); setUpdate(""); setShow(false); notify("Standup added"); };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Standup removed"); };

  const filtered = items.filter((i) => i.person.toLowerCase().includes(search.toLowerCase()) || i.update.toLowerCase().includes(search.toLowerCase()));
  const blockers = items.filter((i) => i.blocker).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Standups</h1><p className="text-sm text-slate-500">{items.length} updates · {blockers} blockers</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New update</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={update} onChange={(e) => setUpdate(e.target.value)} placeholder="Update" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search standups..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md">{i.person[0]}</div>
              <div>
                <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.person}</span><span className="flex items-center gap-0.5 text-xs text-slate-400"><Clock className="h-3 w-3" /> {i.date}</span></div>
                <div className="mt-0.5 text-sm text-slate-600">{i.update}</div>
                {i.blocker && <div className="mt-1 flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700"><Radio className="h-3 w-3" /> Blocked: {i.blocker}</div>}
              </div>
            </div>
            <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
