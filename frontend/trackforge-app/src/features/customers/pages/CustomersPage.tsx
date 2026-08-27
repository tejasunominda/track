import { useState } from "react";
import { Building2, Plus, Trash2, Search, Mail, DollarSign, Users } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Customer { id: string; name: string; tier: "Enterprise" | "Pro" | "Free"; revenue: number; contacts: number; email: string; }

const tColor = { Enterprise: "bg-purple-100 text-purple-700", Pro: "bg-blue-100 text-blue-700", Free: "bg-slate-100 text-slate-600" };
const tGradient = { Enterprise: "from-purple-500 to-pink-500", Pro: "from-blue-500 to-indigo-600", Free: "from-slate-400 to-slate-600" };

export function CustomersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Customer[]>([
    { id: "c-1", name: "Acme Corp", tier: "Enterprise", revenue: 120000, contacts: 25, email: "admin@acme.com" },
    { id: "c-2", name: "Globex", tier: "Pro", revenue: 29000, contacts: 12, email: "ops@globex.com" },
    { id: "c-3", name: "Initech", tier: "Pro", revenue: 34800, contacts: 8, email: "it@initech.com" },
    { id: "c-4", name: "Umbrella Inc", tier: "Enterprise", revenue: 95000, contacts: 40, email: "contact@umbrella.com" },
    { id: "c-5", name: "Stark Industries", tier: "Free", revenue: 0, contacts: 3, email: "hello@stark.com" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<Customer["tier"]>("Free");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `c-${Date.now()}`, name, tier, revenue: 0, contacts: 0, email }]); setName(""); setEmail(""); setShow(false); notify("Customer created"); };
  const remove = (id: string) => { setItems((p) => p.filter((c) => c.id !== id)); notify("Customer removed"); };

  const tiers = ["All", "Enterprise", "Pro", "Free"];
  const filtered = items.filter((c) => (tierFilter === "All" || c.tier === tierFilter) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())));
  const totalRevenue = items.reduce((s, c) => s + c.revenue, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Customers</h1><p className="text-sm text-slate-500">{items.length} customers · ${totalRevenue.toLocaleString()} total revenue</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New customer</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Contact email" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={tier} onChange={(e) => setTier(e.target.value as Customer["tier"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Free</option><option>Pro</option><option>Enterprise</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {tiers.map((t) => <button key={t} onClick={() => setTierFilter(t)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${tierFilter === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tGradient[c.tier]} text-white shadow-md`}><Building2 className="h-5 w-5" /></div>
              <button onClick={() => remove(c.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mb-1 flex items-center gap-2"><span className="font-bold text-slate-900">{c.name}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tColor[c.tier]}`}>{c.tier}</span></div>
            <div className="mb-3 flex items-center gap-1 text-xs text-slate-400"><Mail className="h-3 w-3" /> {c.email}</div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-green-500" /><div><div className="text-sm font-bold text-slate-900">${c.revenue.toLocaleString()}</div><div className="text-[10px] text-slate-400">Revenue</div></div></div>
              <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-blue-500" /><div><div className="text-sm font-bold text-slate-900">{c.contacts}</div><div className="text-[10px] text-slate-400">Contacts</div></div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
