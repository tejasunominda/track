import { useState } from "react";
import { Box, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function InventoryPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "inv-1", name: "Laptop", quantity: 12 },
    { id: "inv-2", name: "Monitor", quantity: 4 },
  ]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quantity.trim()) return;
    setItems((prev) => [...prev, { id: `inv-${Date.now()}`, name, quantity: parseInt(quantity) }]);
    setName("");
    setQuantity("");
    setShow(false);
    notify("Item added");
  };

  const increase = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
    notify("Quantity updated");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New item
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Box className="h-5 w-5 text-slate-400" />
              <div className="font-medium text-slate-900">{i.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">{i.quantity}</span>
              <button onClick={() => increase(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">+1</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
