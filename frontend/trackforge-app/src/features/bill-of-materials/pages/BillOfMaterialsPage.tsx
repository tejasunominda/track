import { useState } from "react";
import { Layers, Plus, Trash2, Search, Package } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface BOMLine { id: string; product: string; component: string; quantity: number; }

export function BillOfMaterialsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<BOMLine[]>([
    { id: "bom-1", product: "Widget", component: "Screw", quantity: 4 },
    { id: "bom-2", product: "Gadget", component: "Battery", quantity: 1 },
    { id: "bom-3", product: "Widget", component: "Panel", quantity: 2 },
    { id: "bom-4", product: "Gadget", component: "Screen", quantity: 1 },
  ]);
  const [product, setProduct] = useState("");
  const [component, setComponent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!product.trim() || !component.trim() || !quantity.trim()) return; setItems((p) => [...p, { id: `bom-${Date.now()}`, product, component, quantity: parseInt(quantity) }]); setProduct(""); setComponent(""); setQuantity(""); setShow(false); notify("BOM line added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("BOM line removed"); };

  const filtered = items.filter((i) => i.product.toLowerCase().includes(search.toLowerCase()) || i.component.toLowerCase().includes(search.toLowerCase()));
  const products = [...new Set(items.map((i) => i.product))];
  const totalParts = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Bill of materials</h1><p className="text-sm text-slate-500">{products.length} products · {items.length} lines · {totalParts} parts</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New line</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={component} onChange={(e) => setComponent(e.target.value)} placeholder="Component" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Qty" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search BOM..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-4">
        {products.map((prod) => {
          const lines = filtered.filter((i) => i.product === prod);
          if (!lines.length) return null;
          return (
            <div key={prod} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2 font-bold text-slate-900"><Package className="h-4 w-4 text-blue-500" /> {prod} <span className="text-xs font-normal text-slate-400">({lines.length} components)</span></div>
              {lines.map((i) => (
                <div key={i.id} className="group flex items-center justify-between border-b border-slate-50 p-3 transition-all hover:bg-slate-50">
                  <div className="flex items-center gap-3"><Layers className="h-4 w-4 text-slate-400" /><span className="font-medium text-slate-900">{i.component}</span></div>
                  <div className="flex items-center gap-3"><span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">x{i.quantity}</span><button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
