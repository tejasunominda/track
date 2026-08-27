import { useState } from "react";
import { Box, Plus, Trash2, Search, Package, AlertTriangle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface InvItem { id: string; name: string; quantity: number; sku: string; }

export function InventoryPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<InvItem[]>([
    { id: "inv-1", name: "Laptop", quantity: 12, sku: "LP-001" },
    { id: "inv-2", name: "Monitor", quantity: 4, sku: "MN-002" },
    { id: "inv-3", name: "Keyboard", quantity: 2, sku: "KB-003" },
  ]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !quantity.trim()) return; setItems((p) => [...p, { id: `inv-${Date.now()}`, name, quantity: parseInt(quantity), sku: "NEW" }]); setName(""); setQuantity(""); setShow(false); notify("Item added"); };
  const increase = (id: string) => { setItems((p) => p.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)); notify("Quantity updated"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Item removed"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase()));
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const lowStock = items.filter((i) => i.quantity <= 5).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Inventory</h1><p className="text-sm text-slate-500">{items.length} items · {totalQty} total · {lowStock} low stock</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New item</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inventory..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const low = i.quantity <= 5;
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${low ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}><Box className="h-5 w-5" /></div>
                <div className="flex items-center gap-2">
                  {low && <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700"><AlertTriangle className="h-3 w-3" /> Low</span>}
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="font-bold text-slate-900">{i.name}</div>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><Package className="h-3 w-3" /> SKU: {i.sku}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-2xl font-bold ${low ? "text-amber-600" : "text-slate-900"}`}>{i.quantity}</span>
                <button onClick={() => increase(i.id)} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-700">+1</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
