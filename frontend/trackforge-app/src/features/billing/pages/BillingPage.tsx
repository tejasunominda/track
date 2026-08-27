import { useState } from "react";
import { Check, CreditCard, Users, Download, TrendingUp, DollarSign, FileText, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const plans = [
  { id: "free", name: "Free", price: "$0", seats: 5, features: ["1 project", "Core issues", "Basic search"] },
  { id: "pro", name: "Pro", price: "$29", seats: 25, features: ["Unlimited projects", "Sprints", "Reports", "Integrations"] },
  { id: "enterprise", name: "Enterprise", price: "Custom", seats: "Unlimited", features: ["SSO", "Audit log", "SLA", "Dedicated support"] },
];

interface Invoice { id: string; date: string; amount: string; status: "Paid" | "Pending" | "Failed"; }

export function BillingPage() {
  const { notify } = useToast();
  const [plan, setPlan] = useState("pro");
  const [invoices] = useState<Invoice[]>([
    { id: "inv-001", date: "Mar 1, 2025", amount: "$290.00", status: "Paid" },
    { id: "inv-002", date: "Feb 1, 2025", amount: "$290.00", status: "Paid" },
    { id: "inv-003", date: "Jan 1, 2025", amount: "$290.00", status: "Paid" },
    { id: "inv-004", date: "Dec 1, 2024", amount: "$290.00", status: "Pending" },
  ]);
  const [cards, setCards] = useState([{ id: "c-1", brand: "Visa", last4: "4242", exp: "12/26", default: true }, { id: "c-2", brand: "Mastercard", last4: "5555", exp: "08/25", default: false }]);

  const usage = { seats: { used: 18, total: 25 }, projects: { used: 12, total: 100 }, storage: { used: 4.2, total: 50 } };
  const sColor = { Paid: "bg-green-100 text-green-700", Pending: "bg-amber-100 text-amber-700", Failed: "bg-red-100 text-red-700" };

  const setDefault = (id: string) => { setCards((p) => p.map((c) => ({ ...c, default: c.id === id }))); notify("Default card updated"); };
  const removeCard = (id: string) => { setCards((p) => p.filter((c) => c.id !== id)); notify("Card removed"); };
  const download = (id: string) => notify(`Invoice ${id} downloaded`);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Billing</h1><p className="text-sm text-slate-500">Manage plan, usage, and payments.</p></div>
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[{ label: "Monthly cost", val: "$290", icon: DollarSign, color: "from-blue-500 to-indigo-600" }, { label: "Active seats", val: "18/25", icon: Users, color: "from-green-500 to-emerald-600" }, { label: "Projects", val: "12", icon: TrendingUp, color: "from-amber-500 to-orange-500" }, { label: "Storage", val: "4.2 GB", icon: FileText, color: "from-purple-500 to-pink-500" }].map((s) => {
          const Icon = s.icon;
          return <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}><Icon className="h-4 w-4" /></div><div className="text-2xl font-bold text-slate-900">{s.val}</div><div className="text-xs text-slate-500">{s.label}</div></div>;
        })}
      </div>
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Current plan</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((p) => (
            <button key={p.id} onClick={() => { setPlan(p.id); notify(`Selected ${p.name}`); }} className={`rounded-xl border bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${plan === p.id ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}>
              <div className="mb-1 flex items-center justify-between"><span className="font-bold text-slate-900">{p.name}</span>{plan === p.id && <Check className="h-4 w-4 text-blue-600" />}</div>
              <div className="mb-3 text-3xl font-bold text-blue-600">{p.price}</div>
              <div className="mb-3 flex items-center gap-1 text-sm text-slate-500"><Users className="h-3.5 w-3.5" /> {p.seats} seats</div>
              <ul className="space-y-1">{p.features.map((f) => <li key={f} className="flex items-center gap-1 text-xs text-slate-600"><Check className="h-3 w-3 text-green-500" /> {f}</li>)}</ul>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Usage</h3>
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {[["Seats", usage.seats.used, usage.seats.total], ["Projects", usage.projects.used, usage.projects.total], ["Storage (GB)", usage.storage.used, usage.storage.total]].map(([label, used, total]) => {
            const pct = Math.round(((used as number) / (total as number)) * 100);
            return <div key={label as string}><div className="mb-1 flex items-center justify-between text-sm"><span className="font-medium text-slate-700">{label as string}</span><span className="text-slate-500">{used as number} / {total as number} ({pct}%)</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all ${pct > 80 ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} /></div></div>;
          })}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Payment methods</h3>
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {cards.map((c) => (
            <div key={c.id} className="group flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:bg-slate-50">
              <div className="flex items-center gap-3"><CreditCard className="h-5 w-5 text-slate-400" /><div><div className="font-bold text-slate-900">{c.brand} ending in {c.last4}</div><div className="text-xs text-slate-500">Expires {c.exp}</div></div>{c.default && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Default</span>}</div>
              <div className="flex items-center gap-2">{!c.default && <button onClick={() => setDefault(c.id)} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200">Set default</button>}<button onClick={() => removeCard(c.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100">Remove</button></div>
            </div>
          ))}
          <button onClick={() => notify("Add card form opened")} className="flex items-center gap-1 rounded-lg border-2 border-dashed border-slate-300 p-3 text-sm font-semibold text-slate-500 transition-all hover:border-blue-400 hover:text-blue-600"><Plus className="h-4 w-4" /> Add payment method</button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Invoice history</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm"><thead className="bg-slate-50"><tr className="text-xs font-bold uppercase text-slate-500"><th className="px-4 py-3 text-left">Invoice</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Amount</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3"></th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="group transition-all hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700">{inv.id}</td>
                  <td className="px-4 py-3 text-slate-600">{inv.date}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{inv.amount}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${sColor[inv.status]}`}>{inv.status}</span></td>
                  <td className="px-4 py-3 text-right"><button onClick={() => download(inv.id)} className="flex items-center gap-1 text-blue-600 opacity-0 transition-all hover:text-blue-700 group-hover:opacity-100"><Download className="h-3.5 w-3.5" /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
