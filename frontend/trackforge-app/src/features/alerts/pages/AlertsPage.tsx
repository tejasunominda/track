import { useState } from "react";
import { AlertTriangle, Bell, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function AlertsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "al-1", message: "High latency", severity: "P1", acknowledged: false },
    { id: "al-2", message: "Disk space low", severity: "P2", acknowledged: false },
  ]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("P3");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setItems((prev) => [...prev, { id: `al-${Date.now()}`, message, severity, acknowledged: false }]);
    setMessage("");
    setShow(false);
    notify("Alert created");
  };

  const ack = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, acknowledged: true } : i)));
    notify("Alert acknowledged");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Alerts</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New alert
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.message}</div>
                <div className="text-xs text-slate-500">{i.severity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.severity === "P1" ? "bg-red-100 text-red-700" : i.severity === "P2" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"}`}>
                <AlertTriangle className="h-3 w-3" /> {i.severity}
              </span>
              {!i.acknowledged && (
                <button onClick={() => ack(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Ack</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
