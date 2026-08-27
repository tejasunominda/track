import { useState } from "react";
import { HardDrive, Plus, Trash2, Search, User } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Device { id: string; name: string; owner: string; status: "Active" | "Inactive" | "Repair"; type: string; }

const sColor = { Active: "bg-green-100 text-green-700", Inactive: "bg-slate-100 text-slate-600", Repair: "bg-amber-100 text-amber-700" };

export function HardwarePage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Device[]>([
    { id: "hw-1", name: "MacBook", owner: "Alice", status: "Active", type: "Laptop" },
    { id: "hw-2", name: "Dock", owner: "Bob", status: "Inactive", type: "Accessory" },
    { id: "hw-3", name: "Monitor", owner: "Charlie", status: "Active", type: "Display" },
    { id: "hw-4", name: "Keyboard", owner: "Dana", status: "Repair", type: "Accessory" },
  ]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !owner.trim()) return; setItems((p) => [...p, { id: `hw-${Date.now()}`, name, owner, status: "Active", type: "Accessory" }]); setName(""); setOwner(""); setShow(false); notify("Hardware added"); };
  const remove = (id: string) => { setItems((p) => p.filter((d) => d.id !== id)); notify("Hardware removed"); };

  const statuses = ["All", "Active", "Inactive", "Repair"];
  const filtered = items.filter((d) => (statusFilter === "All" || d.status === statusFilter) && (d.name.toLowerCase().includes(search.toLowerCase()) || d.owner.toLowerCase().includes(search.toLowerCase())));
  const stats = { total: items.length, active: items.filter((d) => d.status === "Active").length, repair: items.filter((d) => d.status === "Repair").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Hardware</h1><p className="text-sm text-slate-500">{stats.total} devices · {stats.active} active · {stats.repair} in repair</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New device</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Device" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hardware..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {statuses.map((s) => <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${statusFilter === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <div key={d.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${d.status === "Active" ? "bg-gradient-to-br from-green-500 to-emerald-600" : d.status === "Repair" ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><HardDrive className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[d.status]}`}>{d.status}</span>
                <button onClick={() => remove(d.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{d.name}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-500">{d.type}</span><span className="flex items-center gap-0.5"><User className="h-3 w-3" /> {d.owner}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
