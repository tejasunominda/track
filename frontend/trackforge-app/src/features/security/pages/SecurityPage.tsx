import { useState } from "react";
import { ShieldCheck, Lock, KeyRound, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function SecurityPage() {
  const { notify } = useToast();
  const [mfa, setMfa] = useState(true);
  const [sso, setSso] = useState(true);
  const [ipAllow, setIpAllow] = useState(false);
  const [auditExport, setAuditExport] = useState(true);
  const [passwordMin, setPasswordMin] = useState(12);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [showKey, setShowKey] = useState(false);
  const apiKey = "tf_live_8f2a9b3c1d7e4f6a";

  const toggle = (name: string, val: boolean, set: (v: boolean) => void) => {
    set(!val); notify(`${name} ${!val ? "enabled" : "disabled"}`);
  };

  const policies = [
    { label: "Multi-factor authentication", desc: "Require MFA for all users", on: mfa, set: (v: boolean) => setMfa(v), icon: KeyRound, color: "from-blue-500 to-indigo-600" },
    { label: "Single sign-on (SAML/OIDC)", desc: "Federated identity provider", on: sso, set: (v: boolean) => setSso(v), icon: Lock, color: "from-purple-500 to-pink-500" },
    { label: "IP allow-list", desc: "Restrict access to known IPs", on: ipAllow, set: (v: boolean) => setIpAllow(v), icon: ShieldCheck, color: "from-amber-500 to-orange-500" },
    { label: "Audit log export", desc: "Auto-export audit logs weekly", on: auditExport, set: (v: boolean) => setAuditExport(v), icon: Eye, color: "from-green-500 to-emerald-600" },
  ];

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Security</h1>
        <p className="text-sm text-slate-500">Configure authentication and access policies</p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {policies.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-white shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{p.label}</div>
                  <div className="text-xs text-slate-500">{p.desc}</div>
                </div>
              </div>
              <button onClick={() => toggle(p.label, p.on, p.set)} className={`relative h-6 w-11 rounded-full transition-all ${p.on ? "bg-green-500" : "bg-slate-300"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${p.on ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="mb-2 block text-sm font-bold text-slate-700">Minimum password length</label>
          <div className="flex items-center gap-3">
            <input type="range" min={8} max={32} value={passwordMin} onChange={(e) => setPasswordMin(Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="w-12 rounded-lg bg-blue-100 px-2 py-1 text-center text-sm font-bold text-blue-700">{passwordMin}</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="mb-2 block text-sm font-bold text-slate-700">Session timeout (minutes)</label>
          <div className="flex items-center gap-3">
            <input type="range" min={5} max={120} step={5} value={sessionTimeout} onChange={(e) => setSessionTimeout(Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="w-12 rounded-lg bg-blue-100 px-2 py-1 text-center text-sm font-bold text-blue-700">{sessionTimeout}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-slate-700" />
          <h3 className="font-bold text-slate-900">API key</h3>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-900 p-3">
          <code className="flex-1 font-mono text-sm text-green-400">{showKey ? apiKey : "•".repeat(apiKey.length)}</code>
          <button onClick={() => setShowKey((s) => !s)} className="rounded p-1 text-slate-400 hover:text-white">{showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Keep this key secret. Do not commit it to source control.
        </div>
      </div>
    </div>
  );
}
