import { useState } from "react";
import { Bell, Mail, Slack, Smartphone, Webhook, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Channel { id: string; name: string; type: "Email" | "Slack" | "SMS" | "Webhook" | "In-app"; enabled: boolean; }

export function NotificationsHubPage() {
  const { notify } = useToast();
  const [channels, setChannels] = useState<Channel[]>([
    { id: "ch-1", name: "Team Slack", type: "Slack", enabled: true },
    { id: "ch-2", name: "Email alerts", type: "Email", enabled: true },
    { id: "ch-3", name: "SMS critical", type: "SMS", enabled: false },
    { id: "ch-4", name: "In-app banner", type: "In-app", enabled: true },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Channel["type"]>("Slack");
  const [show, setShow] = useState(false);

  const events = [
    { name: "Issue created", email: true, slack: true, sms: false, inapp: true },
    { name: "Issue assigned", email: true, slack: true, sms: false, inapp: true },
    { name: "Sprint started", email: false, slack: true, sms: false, inapp: true },
    { name: "Deployment failed", email: true, slack: true, sms: true, inapp: true },
    { name: "Comment added", email: false, slack: false, sms: false, inapp: true },
  ];
  const [prefs, setPrefs] = useState(events);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setChannels((p) => [...p, { id: `ch-${Date.now()}`, name, type, enabled: true }]);
    setName(""); setShow(false); notify("Channel added");
  };
  const toggle = (id: string) => {
    setChannels((p) => p.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)));
    notify("Channel toggled");
  };
  const remove = (id: string) => { setChannels((p) => p.filter((c) => c.id !== id)); notify("Channel removed"); };
  const togglePref = (idx: number, key: "email" | "slack" | "sms" | "inapp") => {
    setPrefs((p) => p.map((e, i) => (i === idx ? { ...e, [key]: !e[key] } : e)));
  };

  const icon = { Email: Mail, Slack, SMS: Smartphone, Webhook, "In-app": Bell };
  const cColor = { Email: "from-blue-500 to-indigo-600", Slack: "from-purple-500 to-pink-500", SMS: "from-green-500 to-emerald-600", Webhook: "from-amber-500 to-orange-500", "In-app": "from-slate-600 to-slate-800" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications hub</h1>
          <p className="text-sm text-slate-500">{channels.filter((c) => c.enabled).length} active channels</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New channel
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Channel name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value as Channel["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Email</option><option>Slack</option><option>SMS</option><option>Webhook</option><option>In-app</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => {
          const Icon = icon[c.type];
          return (
            <div key={c.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${cColor[c.type]} text-white shadow-md`}><Icon className="h-4 w-4" /></div>
                <button onClick={() => remove(c.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="mb-3 text-xs text-slate-500">{c.type}</div>
              <button onClick={() => toggle(c.id)} className={`relative h-6 w-11 rounded-full transition-all ${c.enabled ? "bg-green-500" : "bg-slate-300"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${c.enabled ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold text-slate-900">Event preferences</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
              <th className="pb-2 text-left">Event</th>
              <th className="pb-2 text-center">Email</th>
              <th className="pb-2 text-center">Slack</th>
              <th className="pb-2 text-center">SMS</th>
              <th className="pb-2 text-center">In-app</th>
            </tr>
          </thead>
          <tbody>
            {prefs.map((e, i) => (
              <tr key={e.name} className="border-b border-slate-100 transition-all hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-700">{e.name}</td>
                {(["email", "slack", "sms", "inapp"] as const).map((k) => (
                  <td key={k} className="text-center">
                    <button onClick={() => togglePref(i, k)} className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-all hover:scale-110 ${e[k] ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}>{e[k] ? "ON" : "OFF"}</button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
