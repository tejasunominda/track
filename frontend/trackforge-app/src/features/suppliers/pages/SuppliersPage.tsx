import { useState } from "react";
import { Plus, Truck, Trash2, Search, Mail, Star, Package } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Supplier { id: string; name: string; rating: "A" | "B" | "C"; email: string; orders: number; category: string; }

const rColor = { A: "bg-green-100 text-green-700", B: "bg-amber-100 text-amber-700", C: "bg-red-100 text-red-700" };
const rGradient = { A: "from-green-500 to-emerald-600", B: "from-amber-500 to-orange-500", C: "from-red-500 to-rose-600" };

export function SuppliersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Supplier[]>([
    { id: "su-1", name: "Supplier X", rating: "A", email: "sales@supplierx.com", orders: 42, category: "Electronics" },
    { id: "su-2", name: "Supplier Y", rating: "B", email: "contact@suppliery.com", orders: 18, category: "Raw materials" },
    { id: "su-3", name: "Supplier Z", rating: "A", email: "orders@supplierz.com", orders: 67, category: "Logistics" },
    { id: "su-4", name: "Acme Supply", rating: "C", email: "info@acmesupply.com", orders: 5, category: "Packaging" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `su-${Date.now()}`, name, rating: "C", email, orders: 0, category }]); setName(""); setEmail(""); setShow(false); notify("Supplier added"); };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Supplier removed"); };

  const ratings = ["All", "A", "B", "C"];
  const filtered = items.filter((s) => (ratingFilter === "All" || s.rating === ratingFilter) && (s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase())));
  const totalOrders = items.reduce((s, i) => s + i.orders, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Suppliers</h1><p className="text-sm text-slate-500">{items.length} suppliers · {totalOrders} total orders</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New supplier</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Supplier name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Contact email" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Electronics</option><option>Raw materials</option><option>Logistics</option><option>Packaging</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search suppliers..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {ratings.map((r) => <button key={r} onClick={() => setRatingFilter(r)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${ratingFilter === r ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{r === "All" ? "All" : `Rating ${r}`}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div key={s.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${rGradient[s.rating]} text-white shadow-md`}><Truck className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-bold ${rColor[s.rating]}`}><Star className="h-3 w-3 fill-current" /> {s.rating}</span>
                <button onClick={() => remove(s.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mb-1 font-bold text-slate-900">{s.name}</div>
            <div className="mb-3 flex items-center gap-1 text-xs text-slate-400"><Mail className="h-3 w-3" /> {s.email}</div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1"><Package className="h-3.5 w-3.5 text-blue-500" /><div><div className="text-sm font-bold text-slate-900">{s.orders}</div><div className="text-[10px] text-slate-400">Orders</div></div></div>
              <div><div className="text-sm font-bold text-slate-900">{s.category}</div><div className="text-[10px] text-slate-400">Category</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
