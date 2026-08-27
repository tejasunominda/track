import { useState } from "react";
import { Plus, Trash2, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface RequestType { id: string; name: string; icon: string; sla: number; portal: boolean; }

const ICONS = ["🐛", "💡", "🔧", "📋", "🔑", "📦", "💬", "⚡"];

export function RequestTypesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<RequestType[]>([
    { id: "rt-1", name: "Report a bug", icon: "🐛", sla: 24, portal: true },
    { id: "rt-2", name: "Request a feature", icon: "💡", sla: 72, portal: true },
    { id: "rt-3", name: "Get IT help", icon: "🔧", sla: 8, portal: true },
    { id: "rt-4", name: "Access request", icon: "🔑", sla: 48, portal: false },
  ]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📋");
  const [sla, setSla] = useState(24);
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `rt-${Date.now()}`, name, icon, sla, portal: true }]);
    setName(""); setShow(false); notify("Request type created");
  };
  const togglePortal = (id: string) => {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, portal: !r.portal } : r)));
    notify("Portal visibility toggled");
  };
  const remove = (id: string) => { setItems((p) => p.filter((r) => r.id !== id)); notify("Request type deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Request types</h1>
          <p className="text-sm text-slate-500">{items.length} types · {items.filter((r) => r.portal).length} on portal</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New request type
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[auto_1fr_auto_auto]">
          <select value={icon} onChange={(e) => setIcon(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-2 text-lg outline-none focus:border-blue-500">
            {ICONS.map((i) => <option key={i}>{i}</option>)}
          </select>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Request type name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={sla} onChange={(e) => setSla(Number(e.target.value))} placeholder="SLA (h)" className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <div key={r.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-xl shadow-sm">{r.icon}</div>
              <div>
                <div className="font-bold text-slate-900">{r.name}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> SLA {r.sla}h</span>
                  {r.sla <= 8 && <span className="flex items-center gap-0.5 text-amber-600"><AlertCircle className="h-3 w-3" /> urgent</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => togglePortal(r.id)} className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 ${r.portal ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}>{r.portal ? "PORTAL" : "HIDDEN"}</button>
              <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
