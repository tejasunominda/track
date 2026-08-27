import { useState } from "react";
import { Gavel, Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Policy { id: string; title: string; version: string; active: boolean; category: string; }

export function PoliciesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Policy[]>([
    { id: "po-1", title: "Policy A", version: "1.0", active: true, category: "Security" },
    { id: "po-2", title: "Policy B", version: "0.5", active: false, category: "HR" },
    { id: "po-3", title: "Remote work", version: "2.1", active: true, category: "HR" },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; setItems((p) => [...p, { id: `po-${Date.now()}`, title, version: "0.1", active: false, category: "General" }]); setTitle(""); setShow(false); notify("Policy created"); };
  const toggle = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, active: !i.active } : i)); notify("Policy updated"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Policy removed"); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  const stats = { total: items.length, active: items.filter((i) => i.active).length, inactive: items.filter((i) => !i.active).length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Policies</h1><p className="text-sm text-slate-500">{stats.total} policies · {stats.active} active · {stats.inactive} inactive</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Policy title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search policies..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.active ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><Gavel className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggle(i.id)} className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${i.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{i.active ? "Active" : "Inactive"}</button>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.title}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-500">v{i.version}</span><span>{i.category}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
