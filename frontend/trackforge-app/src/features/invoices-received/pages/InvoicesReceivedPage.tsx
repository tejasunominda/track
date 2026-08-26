import { useState } from "react";
import { CheckCircle, FileText, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function InvoicesReceivedPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "inv-1", vendor: "Acme Hosting", amount: 900, status: "Unpaid" },
    { id: "inv-2", vendor: "Design Studio", amount: 2400, status: "Paid" },
  ]);
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor.trim() || !amount.trim()) return;
    setItems((prev) => [...prev, { id: `inv-${Date.now()}`, vendor, amount: parseInt(amount), status: "Unpaid" }]);
    setVendor("");
    setAmount("");
    setShow(false);
    notify("Invoice received");
  };

  const pay = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Paid" } : i)));
    notify("Invoice paid");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Invoices received</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New invoice
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.vendor}</div>
                <div className="text-xs text-slate-500">${i.amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{i.status}</span>
              {i.status !== "Paid" && (
                <button onClick={() => pay(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                  <CheckCircle className="h-3 w-3" /> Pay
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
