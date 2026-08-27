import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Users, Bug, CheckCircle2, Clock, Activity } from "lucide-react";

interface Metric { label: string; value: number; change: number; icon: React.ElementType; color: string; }

export function AnalyticsPage() {
  const [range, setRange] = useState("7d");

  const metrics: Metric[] = [
    { label: "Total issues", value: 1284, change: 12, icon: Activity, color: "from-blue-500 to-indigo-600" },
    { label: "Resolved", value: 892, change: 8, icon: CheckCircle2, color: "from-green-500 to-emerald-600" },
    { label: "Open bugs", value: 47, change: -23, icon: Bug, color: "from-red-500 to-orange-500" },
    { label: "Active users", value: 156, change: 5, icon: Users, color: "from-purple-500 to-pink-500" },
  ];

  const throughput = [
    { day: "Mon", created: 12, resolved: 8 },
    { day: "Tue", created: 15, resolved: 11 },
    { day: "Wed", created: 8, resolved: 14 },
    { day: "Thu", created: 18, resolved: 12 },
    { day: "Fri", created: 22, resolved: 19 },
    { day: "Sat", created: 5, resolved: 7 },
    { day: "Sun", created: 3, resolved: 4 },
  ];
  const maxVal = Math.max(...throughput.flatMap((d) => [d.created, d.resolved]));

  const types = [
    { name: "Story", value: 540, color: "bg-blue-500" },
    { name: "Bug", value: 320, color: "bg-red-500" },
    { name: "Task", value: 280, color: "bg-amber-500" },
    { name: "Epic", value: 144, color: "bg-purple-500" },
  ];
  const totalTypes = types.reduce((s, t) => s + t.value, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500">Platform-wide metrics and trends</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {["24h", "7d", "30d", "90d"].map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${range === r ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const up = m.change >= 0;
          return (
            <div key={m.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${m.color} text-white shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-bold ${up ? "text-green-600" : "text-red-600"}`}>
                  {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(m.change)}%
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{m.value.toLocaleString()}</div>
              <div className="text-xs text-slate-500">{m.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold text-slate-900">Throughput</h3>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 180 }}>
            {throughput.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-1 items-end justify-center gap-1">
                  <div className="w-1/2 rounded-t bg-blue-500 transition-all hover:brightness-110" style={{ height: `${(d.created / maxVal) * 100}%` }} title={`Created: ${d.created}`} />
                  <div className="w-1/2 rounded-t bg-green-500 transition-all hover:brightness-110" style={{ height: `${(d.resolved / maxVal) * 100}%` }} title={`Resolved: ${d.resolved}`} />
                </div>
                <span className="text-[10px] font-medium text-slate-500">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-blue-500" /> Created</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-green-500" /> Resolved</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <h3 className="font-bold text-slate-900">Issue type distribution</h3>
          </div>
          <div className="mb-4 flex h-4 overflow-hidden rounded-full bg-slate-100">
            {types.map((t) => (
              <div key={t.name} className={t.color} style={{ width: `${(t.value / totalTypes) * 100}%` }} title={`${t.name}: ${t.value}`} />
            ))}
          </div>
          <div className="space-y-2">
            {types.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className={`h-3 w-3 rounded ${t.color}`} /> {t.name}</span>
                <span className="font-semibold text-slate-700">{t.value} <span className="text-xs text-slate-400">({Math.round((t.value / totalTypes) * 100)}%)</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
