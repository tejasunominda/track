import { useState } from "react";
import { Webhook, Plus, Trash2, Zap, CheckCircle2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Hook { id: string; url: string; event: string; active: boolean; lastDelivery: string | null; }

const EVENTS = ["issue.created", "issue.updated", "sprint.started", "deployment.completed"];

export function WebhooksPage() {
  const { notify } = useToast();
  const [hooks, setHooks] = useState<Hook[]>([
    { id: "wh-1", url: "https://api.example.com/hooks/trackforge", event: "issue.created", active: true, lastDelivery: "2 min ago" },
    { id: "wh-2", url: "https://ci.example.com/build", event: "deployment.completed", active: true, lastDelivery: "1 hour ago" },
  ]);
  const [url, setUrl] = useState("");
  const [event, setEvent] = useState(EVENTS[0]);
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setHooks((p) => [...p, { id: `wh-${Date.now()}`, url, event, active: true, lastDelivery: null }]);
    setUrl(""); setShow(false); notify("Webhook registered");
  };
  const toggle = (id: string) => {
    setHooks((p) => p.map((h) => (h.id === id ? { ...h, active: !h.active } : h)));
    notify("Webhook toggled");
  };
  const test = (id: string) => {
    setHooks((p) => p.map((h) => (h.id === id ? { ...h, lastDelivery: "just now" } : h)));
    notify("Test delivery sent");
  };
  const remove = (id: string) => { setHooks((p) => p.filter((h) => h.id !== id)); notify("Webhook deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Webhooks</h1>
          <p className="text-sm text-slate-500">{hooks.length} endpoints · {hooks.filter((h) => h.active).length} active</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New webhook
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={event} onChange={(e) => setEvent(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            {EVENTS.map((ev) => <option key={ev}>{ev}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Register</button>
        </form>
      )}
      <div className="space-y-3">
        {hooks.map((h) => (
          <div key={h.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-md ${h.active ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-slate-200"}`}>
                <Webhook className={`h-5 w-5 ${h.active ? "text-white" : "text-slate-400"}`} />
              </div>
              <div>
                <div className="font-mono text-sm font-semibold text-slate-900">{h.url}</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 font-bold text-blue-700">{h.event}</span>
                  {h.lastDelivery && <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-500" /> {h.lastDelivery}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => test(h.id)} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200"><Zap className="h-3.5 w-3.5" /> Test</button>
              <button onClick={() => toggle(h.id)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 ${h.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{h.active ? "ACTIVE" : "PAUSED"}</button>
              <button onClick={() => remove(h.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
