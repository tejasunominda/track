import { useState } from "react";
import { CreditCard, Check, Zap, Building2, Star } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Plan { id: string; name: string; price: number; features: string[]; current: boolean; popular: boolean; icon: typeof Zap; }

export function SubscriptionsPage() {
  const { notify } = useToast();
  const [plans] = useState<Plan[]>([
    { id: "free", name: "Free", price: 0, features: ["5 projects", "3 users", "1 GB storage", "Community support"], current: true, popular: false, icon: Star },
    { id: "pro", name: "Professional", price: 29, features: ["Unlimited projects", "25 users", "50 GB storage", "Priority support", "Advanced reports", "SSO"], current: false, popular: true, icon: Zap },
    { id: "ent", name: "Enterprise", price: 99, features: ["Everything in Pro", "Unlimited users", "1 TB storage", "Dedicated support", "Custom integrations", "SLA 99.99%"], current: false, popular: false, icon: Building2 },
  ]);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const upgrade = (plan: Plan) => {
    notify(`Switched to ${plan.name} plan`);
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="text-sm text-slate-500">Choose your plan · cancel anytime</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm">
          <button onClick={() => setBilling("monthly")} className={`rounded-md px-3 py-1.5 text-sm font-bold transition-all ${billing === "monthly" ? "bg-blue-600 text-white" : "text-slate-600"}`}>Monthly</button>
          <button onClick={() => setBilling("yearly")} className={`rounded-md px-3 py-1.5 text-sm font-bold transition-all ${billing === "yearly" ? "bg-blue-600 text-white" : "text-slate-600"}`}>Yearly <span className="text-xs text-green-500">-20%</span></button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p) => {
          const Icon = p.icon;
          const price = billing === "yearly" ? Math.round(p.price * 0.8) : p.price;
          return (
            <div key={p.id} className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-lg ${p.popular ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200"}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-md">MOST POPULAR</div>}
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md ${p.popular ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-slate-500 to-slate-700"}`}><Icon className="h-6 w-6" /></div>
              <h3 className="mb-1 text-xl font-bold text-slate-900">{p.name}</h3>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">${price}</span>
                <span className="text-sm text-slate-500">/user/mo</span>
              </div>
              <ul className="mb-6 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100"><Check className="h-3 w-3 text-green-600" /></div>
                    {f}
                  </li>
                ))}
              </ul>
              {p.current ? (
                <div className="flex items-center justify-center gap-2 rounded-lg bg-green-100 py-2.5 text-sm font-bold text-green-700"><Check className="h-4 w-4" /> Current plan</div>
              ) : (
                <button onClick={() => upgrade(p)} className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all hover:scale-[1.02] ${p.popular ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:brightness-110" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                  <CreditCard className="h-4 w-4" /> Upgrade to {p.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
