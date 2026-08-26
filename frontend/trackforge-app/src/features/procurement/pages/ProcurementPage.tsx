import { useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ProcurementPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "pr-1", item: "Purchase", quantity: 10, status: "Requested" },
    { id: "pr-2", item: "Raw steel", quantity: 50, status: "Approved" },
  ]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !quantity.trim()) return;
    setItems((prev) => [...prev, { id: `pr-${Date.now()}`, item, quantity: parseInt(quantity), status: "Requested" }]);
    setItem("");
    setQuantity("");
    setShow(false);
    notify("Request created");
  };

  const approve = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Approved" } : i)));
    notify("Request approved");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Procurement</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New request
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.item}</div>
                <div className="text-xs text-slate-500">Qty: {i.quantity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{i.status}</span>
              {i.status !== "Approved" && (
                <button onClick={() => approve(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Approve</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
