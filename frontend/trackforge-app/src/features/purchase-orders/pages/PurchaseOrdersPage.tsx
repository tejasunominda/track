import { useState } from "react";
import { ClipboardList, Plus, Send } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function PurchaseOrdersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "po-1", name: "PO 1001", amount: 5000, status: "Draft" },
    { id: "po-2", name: "PO 1002", amount: 12000, status: "Sent" },
  ]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim()) return;
    setItems((prev) => [...prev, { id: `po-${Date.now()}`, name, amount: parseInt(amount), status: "Draft" }]);
    setName("");
    setAmount("");
    setShow(false);
    notify("Purchase order created");
  };

  const send = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Sent" } : i)));
    notify("Purchase order sent");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Purchase orders</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New PO
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="PO name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">${i.amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Sent" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{i.status}</span>
              {i.status !== "Sent" && (
                <button onClick={() => send(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                  <Send className="h-3 w-3" /> Send
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
