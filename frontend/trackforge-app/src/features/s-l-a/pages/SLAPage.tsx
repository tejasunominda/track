import { useState } from "react";
import { Clock, Plus, Shield } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function SLAPage() {
  const { notify } = useToast();
  const [policies, setPolicies] = useState([
    { id: "sla-1", name: "Premium", responseMinutes: 60, resolutionHours: 24 },
    { id: "sla-2", name: "Standard", responseMinutes: 240, resolutionHours: 72 },
  ]);
  const [name, setName] = useState("");
  const [resp, setResp] = useState("");
  const [res, setRes] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !resp.trim() || !res.trim()) return;
    setPolicies((prev) => [...prev, { id: `sla-${Date.now()}`, name, responseMinutes: parseInt(resp), resolutionHours: parseInt(res) }]);
    setName("");
    setResp("");
    setRes("");
    setShow(false);
    notify("SLA policy created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">SLA policies</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New policy
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Policy name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={resp} onChange={(e) => setResp(e.target.value)} placeholder="Response (min)" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={res} onChange={(e) => setRes(e.target.value)} placeholder="Resolution (h)" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {policies.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{p.name}</div>
                <div className="text-xs text-slate-500">Response: {p.responseMinutes}m · Resolution: {p.resolutionHours}h</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600"><Clock className="h-3 w-3" /> {p.resolutionHours}h</div>
          </div>
        ))}
      </div>
    </div>
  );
}
