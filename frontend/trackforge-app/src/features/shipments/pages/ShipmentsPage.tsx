import { useState } from "react";
import { MapPin, Plus, Truck } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ShipmentsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "s-1", order: "Order 456", tracking: "1Z999AA10123456784", status: "In transit" },
    { id: "s-2", order: "Order 457", tracking: "1Z999BB20234567890", status: "Delivered" },
  ]);
  const [order, setOrder] = useState("");
  const [tracking, setTracking] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order.trim() || !tracking.trim()) return;
    setItems((prev) => [...prev, { id: `s-${Date.now()}`, order, tracking, status: "In transit" }]);
    setOrder("");
    setTracking("");
    setShow(false);
    notify("Shipment created");
  };

  const deliver = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Delivered" } : i)));
    notify("Shipment delivered");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Shipments</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New shipment
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Order" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Tracking" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.order}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" /> {i.tracking}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{i.status}</span>
              {i.status !== "Delivered" && (
                <button onClick={() => deliver(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Deliver</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
