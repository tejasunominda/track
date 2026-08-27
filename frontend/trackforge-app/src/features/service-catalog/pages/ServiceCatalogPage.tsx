import { useState } from "react";
import { Plus, Trash2, Server } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Service { id: string; name: string; owner: string; tier: "Critical" | "Standard" | "Internal"; status: "Operational" | "Degraded" | "Down"; }

export function ServiceCatalogPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Service[]>([
    { id: "svc-1", name: "API Gateway", owner: "Platform Team", tier: "Critical", status: "Operational" },
    { id: "svc-2", name: "Auth Service", owner: "Security Team", tier: "Critical", status: "Operational" },
    { id: "svc-3", name: "Notification Service", owner: "Eng Team", tier: "Standard", status: "Degraded" },
    { id: "svc-4", name: "Analytics Pipeline", owner: "Data Team", tier: "Internal", status: "Operational" },
  ]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [tier, setTier] = useState<Service["tier"]>("Standard");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `svc-${Date.now()}`, name, owner, tier, status: "Operational" }]);
    setName(""); setOwner(""); setShow(false); notify("Service added");
  };
  const cycleStatus = (id: string) => {
    const order: Service["status"][] = ["Operational", "Degraded", "Down"];
    setItems((p) => p.map((s) => (s.id === id ? { ...s, status: order[(order.indexOf(s.status) + 1) % 3] } : s)));
    notify("Status updated");
  };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Service removed"); };

  const tColor = { Critical: "bg-red-100 text-red-700", Standard: "bg-blue-100 text-blue-700", Internal: "bg-slate-100 text-slate-600" };
  const sColor = { Operational: "bg-green-100 text-green-700", Degraded: "bg-amber-100 text-amber-700", Down: "bg-red-100 text-red-700" };
  const sDot = { Operational: "bg-green-500", Degraded: "bg-amber-500", Down: "bg-red-500" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Service catalog</h1>
          <p className="text-sm text-slate-500">{items.length} services · {items.filter((s) => s.status === "Operational").length} operational</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New service
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Service name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner team" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={tier} onChange={(e) => setTier(e.target.value as Service["tier"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Critical</option><option>Standard</option><option>Internal</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <div key={s.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-md"><Server className="h-4 w-4" /></div>
                <span className="font-bold text-slate-900">{s.name}</span>
              </div>
              <button onClick={() => remove(s.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mb-3 text-xs text-slate-500">Owner: {s.owner}</div>
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tColor[s.tier]}`}>{s.tier}</span>
              <button onClick={() => cycleStatus(s.id)} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-all hover:scale-105 ${sColor[s.status]}`}>
                <span className={`h-2 w-2 rounded-full ${sDot[s.status]}`} /> {s.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
