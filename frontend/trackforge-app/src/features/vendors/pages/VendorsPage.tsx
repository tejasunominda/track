import { useState } from "react";
import { Building2, Plus, Trash2, Search, Mail } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Vendor { id: string; name: string; category: string; contact: string; }

const cColor: Record<string, string> = { Infrastructure: "bg-blue-100 text-blue-700", Creative: "bg-purple-100 text-purple-700", Legal: "bg-amber-100 text-amber-700", Other: "bg-slate-100 text-slate-600" };
const cGradient: Record<string, string> = { Infrastructure: "from-blue-500 to-indigo-600", Creative: "from-purple-500 to-pink-500", Legal: "from-amber-500 to-orange-500", Other: "from-slate-400 to-slate-600" };

export function VendorsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Vendor[]>([
    { id: "v-1", name: "Acme Hosting", category: "Infrastructure", contact: "sales@acme.io" },
    { id: "v-2", name: "Design Studio", category: "Creative", contact: "hello@design.co" },
    { id: "v-3", name: "Legal Partners", category: "Legal", contact: "contact@legal.com" },
  ]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Infrastructure");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `v-${Date.now()}`, name, category, contact: "new@vendor.com" }]); setName(""); setShow(false); notify("Vendor created"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Vendor removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Vendors</h1><p className="text-sm text-slate-500">{items.length} vendors</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New vendor</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Vendor name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Infrastructure</option><option>Creative</option><option>Legal</option><option>Other</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${cGradient[i.category] || cGradient.Other} text-white shadow-md`}><Building2 className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${cColor[i.category] || cColor.Other}`}>{i.category}</span>
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{i.name}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Mail className="h-3 w-3" /> {i.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
