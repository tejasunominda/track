import { useState } from "react";
import { Check, CreditCard, Users } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const plans = [
  { id: "free", name: "Free", price: "$0", seats: 5, features: ["1 project", "Core issues", "Basic search"] },
  { id: "pro", name: "Pro", price: "$29", seats: 25, features: ["Unlimited projects", "Sprints", "Reports", "Integrations"] },
  { id: "enterprise", name: "Enterprise", price: "Custom", seats: "Unlimited", features: ["SSO", "Audit log", "SLA", "Dedicated support"] },
];

export function BillingPage() {
  const { notify } = useToast();
  const [plan, setPlan] = useState("pro");

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="text-sm text-slate-500">Manage plan and usage.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => { setPlan(p.id); notify(`Selected ${p.name}`); }}
            className={`rounded-xl border bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${plan === p.id ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="font-bold text-slate-900">{p.name}</span>
              {plan === p.id && <Check className="h-4 w-4 text-blue-600" />}
            </div>
            <div className="mb-3 text-3xl font-bold text-blue-600">{p.price}</div>
            <div className="mb-3 flex items-center gap-1 text-sm text-slate-500"><Users className="h-3.5 w-3.5" /> {p.seats} seats</div>
            <ul className="space-y-1">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-slate-600">• {f}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <CreditCard className="h-5 w-5 text-slate-400" />
        <div className="text-sm text-slate-700">Current payment method: <span className="font-medium">Visa ending in 4242</span></div>
      </div>
    </div>
  );
}
