import { useState } from "react";
import { Receipt, Plus, Trash2, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Invoice { id: string; number: string; customer: string; amount: number; dueDate: string; status: "Draft" | "Sent" | "Paid" | "Overdue"; }

export function InvoicesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Invoice[]>([
    { id: "inv-1", number: "INV-001", customer: "Acme Corp", amount: 2400, dueDate: "2024-12-15", status: "Paid" },
    { id: "inv-2", number: "INV-002", customer: "Globex Inc", amount: 1800, dueDate: "2024-12-20", status: "Sent" },
    { id: "inv-3", number: "INV-003", customer: "Initech", amount: 3200, dueDate: "2024-11-30", status: "Overdue" },
    { id: "inv-4", number: "INV-004", customer: "Umbrella LLC", amount: 950, dueDate: "2024-12-25", status: "Draft" },
  ]);
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim()) return;
    const num = `INV-${String(items.length + 1).padStart(3, "0")}`;
    setItems((p) => [...p, { id: `inv-${Date.now()}`, number: num, customer, amount: Number(amount) || 0, dueDate: "2025-01-15", status: "Draft" }]);
    setCustomer(""); setAmount(""); setShow(false); notify("Invoice created");
  };
  const markPaid = (id: string) => {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status: "Paid" } : i)));
    notify("Invoice marked as paid");
  };
  const send = (id: string) => {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status: "Sent" } : i)));
    notify("Invoice sent");
  };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Invoice deleted"); };

  const sIcon = { Draft: Clock, Sent: Clock, Paid: CheckCircle2, Overdue: AlertCircle };
  const sColor = { Draft: "bg-slate-100 text-slate-600", Sent: "bg-blue-100 text-blue-700", Paid: "bg-green-100 text-green-700", Overdue: "bg-red-100 text-red-700" };
  const totalPaid = items.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalOutstanding = items.filter((i) => i.status === "Sent" || i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500">${totalPaid.toLocaleString()} paid · ${totalOutstanding.toLocaleString()} outstanding</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New invoice
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount $" className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-xs font-bold uppercase text-slate-500">
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((i) => {
              const Icon = sIcon[i.status];
              return (
                <tr key={i.id} className="group transition-all hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-slate-400" />
                      <span className="font-mono font-bold text-slate-900">{i.number}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{i.customer}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">${i.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Icon className="h-3 w-3" /> {i.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {i.status === "Draft" && <button onClick={() => send(i.id)} className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 transition-all hover:bg-blue-200">Send</button>}
                      {(i.status === "Sent" || i.status === "Overdue") && <button onClick={() => markPaid(i.id)} className="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 transition-all hover:bg-green-200">Mark paid</button>}
                      <button onClick={() => notify("Download started")} className="rounded-lg bg-slate-100 p-1.5 text-slate-600 transition-all hover:bg-slate-200"><Download className="h-4 w-4" /></button>
                      <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
