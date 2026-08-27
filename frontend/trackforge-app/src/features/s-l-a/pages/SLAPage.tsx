import { useState } from "react";
import { Clock, Plus, Shield, Trash2, Search, Zap } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface SLA { id: string; name: string; responseMinutes: number; resolutionHours: number; tier: string; }

export function SLAPage() {
  const { notify } = useToast();
  const [policies, setPolicies] = useState<SLA[]>([
    { id: "sla-1", name: "Premium", responseMinutes: 60, resolutionHours: 24, tier: "P1" },
    { id: "sla-2", name: "Standard", responseMinutes: 240, resolutionHours: 72, tier: "P2" },
    { id: "sla-3", name: "Basic", responseMinutes: 480, resolutionHours: 168, tier: "P3" },
  ]);
  const [name, setName] = useState("");
  const [resp, setResp] = useState("");
  const [res, setRes] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !resp.trim() || !res.trim()) return; setPolicies((p) => [...p, { id: `sla-${Date.now()}`, name, responseMinutes: parseInt(resp), resolutionHours: parseInt(res), tier: "P3" }]); setName(""); setResp(""); setRes(""); setShow(false); notify("SLA policy created"); };
  const remove = (id: string) => { setPolicies((p) => p.filter((i) => i.id !== id)); notify("SLA policy removed"); };

  const filtered = policies.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.tier.toLowerCase().includes(search.toLowerCase()));
  const fastest = policies.length ? Math.min(...policies.map((p) => p.responseMinutes)) : 0;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">SLA policies</h1><p className="text-sm text-slate-500">{policies.length} policies · fastest response {fastest}m</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New policy</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Policy name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input type="number" value={resp} onChange={(e) => setResp(e.target.value)} placeholder="Response (min)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={res} onChange={(e) => setRes(e.target.value)} placeholder="Resolution (h)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search SLA policies..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Shield className="h-5 w-5" /></div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">{p.tier}</span>
                <button onClick={() => remove(p.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{p.name}</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2"><span className="flex items-center gap-1 text-xs font-bold text-amber-700"><Zap className="h-3 w-3" /> Response</span><span className="font-mono text-sm font-bold text-amber-900">{p.responseMinutes}m</span></div>
              <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2"><span className="flex items-center gap-1 text-xs font-bold text-blue-700"><Clock className="h-3 w-3" /> Resolution</span><span className="font-mono text-sm font-bold text-blue-900">{p.resolutionHours}h</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
