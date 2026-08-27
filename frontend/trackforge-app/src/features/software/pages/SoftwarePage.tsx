import { useState } from "react";
import { Plus, Monitor, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Software { id: string; name: string; seats: number; used: number; }

export function SoftwarePage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Software[]>([
    { id: "sw-1", name: "License", seats: 50, used: 32 },
    { id: "sw-2", name: "IDE", seats: 20, used: 18 },
    { id: "sw-3", name: "Design tool", seats: 15, used: 14 },
    { id: "sw-4", name: "CI/CD runner", seats: 100, used: 67 },
  ]);
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !seats.trim()) return; setItems((p) => [...p, { id: `sw-${Date.now()}`, name, seats: parseInt(seats), used: 0 }]); setName(""); setSeats(""); setShow(false); notify("Software added"); };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Software removed"); };

  const filtered = items.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const totalSeats = items.reduce((s, i) => s + i.seats, 0);
  const totalUsed = items.reduce((s, i) => s + i.used, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Software</h1><p className="text-sm text-slate-500">{items.length} licenses · {totalUsed}/{totalSeats} seats used</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New license</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Software name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="Seats" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search software..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-3">
        {filtered.map((i) => {
          const pct = i.seats ? Math.round((i.used / i.seats) * 100) : 0;
          const over = pct > 80;
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${over ? "bg-gradient-to-br from-red-500 to-rose-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}><Monitor className="h-5 w-5" /></div>
                  <div><div className="font-bold text-slate-900">{i.name}</div><div className="text-xs text-slate-400">{over ? "Near capacity" : "Available"}</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right"><div className="text-sm font-bold text-slate-900">{i.used} / {i.seats}</div><div className={`text-xs font-bold ${over ? "text-red-500" : "text-blue-500"}`}>{pct}% used</div></div>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-500 ${over ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
