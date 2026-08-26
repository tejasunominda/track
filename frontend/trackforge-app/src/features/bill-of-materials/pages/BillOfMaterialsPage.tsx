import { useState } from "react";
import { Layers, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function BillOfMaterialsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "bom-1", product: "Widget", component: "Screw", quantity: 4 },
    { id: "bom-2", product: "Gadget", component: "Battery", quantity: 1 },
  ]);
  const [product, setProduct] = useState("");
  const [component, setComponent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim() || !component.trim() || !quantity.trim()) return;
    setItems((prev) => [...prev, { id: `bom-${Date.now()}`, product, component, quantity: parseInt(quantity) }]);
    setProduct("");
    setComponent("");
    setQuantity("");
    setShow(false);
    notify("BOM line added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Bill of materials</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New line
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={component} onChange={(e) => setComponent(e.target.value)} placeholder="Component" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Qty" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.product}</div>
                <div className="text-xs text-slate-500">{i.component} x {i.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
