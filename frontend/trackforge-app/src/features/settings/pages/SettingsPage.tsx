import { useState } from "react";
import { Settings, Bell, Shield, Palette, Building2, Check, Globe, Clock, Monitor, Moon, Sun } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

type Tab = "General" | "Security" | "Notifications" | "Appearance";

export function SettingsPage() {
  const { notify } = useToast();
  const [tab, setTab] = useState<Tab>("General");
  const [name, setName] = useState("Acme");
  const [email, setEmail] = useState("admin@acme.com");
  const [domain, setDomain] = useState("acme.trackforge.io");
  const [timezone, setTimezone] = useState("UTC-5 (Eastern)");
  const [twoFA, setTwoFA] = useState(true);
  const [sso, setSSO] = useState(false);
  const [passPolicy, setPassPolicy] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(true);
  const [mentionNotif, setMentionNotif] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");

  const save = (e: React.FormEvent) => { e.preventDefault(); notify("Settings saved"); };

  const tabs: { id: Tab; icon: typeof Settings }[] = [
    { id: "General", icon: Building2 }, { id: "Security", icon: Shield }, { id: "Notifications", icon: Bell }, { id: "Appearance", icon: Palette },
  ];

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`relative h-6 w-11 rounded-full transition-all ${on ? "bg-blue-600" : "bg-slate-300"}`}>
      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center gap-2">
        <Settings className="h-6 w-6 text-slate-600" />
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <div className="space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return <button key={t.id} onClick={() => setTab(t.id)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-all ${tab === t.id ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-200" : "text-slate-600 hover:bg-white/60"}`}><Icon className="h-4 w-4" /> {t.id}</button>;
          })}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {tab === "General" && (
            <form onSubmit={save} className="space-y-4">
              <div><label className="mb-1 block text-sm font-bold text-slate-700">Organization name</label><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" /></div>
              <div><label className="mb-1 block text-sm font-bold text-slate-700">Admin email</label><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" /></div>
              <div><label className="mb-1 flex items-center gap-1 text-sm font-bold text-slate-700"><Globe className="h-3.5 w-3.5" /> Custom domain</label><input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 font-mono text-sm outline-none focus:border-blue-500" /></div>
              <div><label className="mb-1 flex items-center gap-1 text-sm font-bold text-slate-700"><Clock className="h-3.5 w-3.5" /> Timezone</label><select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"><option>UTC-5 (Eastern)</option><option>UTC-8 (Pacific)</option><option>UTC+0 (GMT)</option><option>UTC+1 (CET)</option><option>UTC+5:30 (IST)</option></select></div>
              <button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">Save changes</button>
            </form>
          )}
          {tab === "Security" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-500">Authentication</h3>
              {[["Two-factor authentication", twoFA, setTwoFA, "Require 2FA for all users"], ["SAML SSO", sso, setSSO, "Enable single sign-on with your IdP"], ["Strong password policy", passPolicy, setPassPolicy, "Min 12 chars, numbers, symbols"]].map(([label, val, set, desc]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition-all hover:bg-slate-50">
                  <div><div className="font-bold text-slate-900">{label as string}</div><div className="text-xs text-slate-500">{desc as string}</div></div>
                  <Toggle on={val as boolean} onClick={() => (set as (v: boolean) => void)(!(val as boolean))} />
                </div>
              ))}
              <button onClick={() => notify("Security settings saved")} className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg">Save security</button>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-500">Notification channels</h3>
              {[["Email notifications", emailNotif, setEmailNotif, "Receive notifications via email"], ["Slack notifications", slackNotif, setSlackNotif, "Send alerts to Slack channels"], ["Mention alerts", mentionNotif, setMentionNotif, "Get notified when @mentioned"], ["Weekly digest", weeklyDigest, setWeeklyDigest, "Summary of activity every Monday"]].map(([label, val, set, desc]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition-all hover:bg-slate-50">
                  <div><div className="font-bold text-slate-900">{label as string}</div><div className="text-xs text-slate-500">{desc as string}</div></div>
                  <Toggle on={val as boolean} onClick={() => (set as (v: boolean) => void)(!(val as boolean))} />
                </div>
              ))}
              <button onClick={() => notify("Notification preferences saved")} className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg">Save preferences</button>
            </div>
          )}
          {tab === "Appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[{ id: "light", icon: Sun, label: "Light" }, { id: "dark", icon: Moon, label: "Dark" }, { id: "system", icon: Monitor, label: "System" }].map((t) => {
                    const Icon = t.icon;
                    return <button key={t.id} onClick={() => { setTheme(t.id); notify(`Theme: ${t.label}`); }} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:scale-105 ${theme === t.id ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}><Icon className="h-6 w-6 text-slate-600" /><span className="text-sm font-bold">{t.label}</span>{theme === t.id && <Check className="h-4 w-4 text-blue-600" />}</button>;
                  })}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Accent color</h3>
                <div className="flex gap-2">
                  {["blue", "indigo", "purple", "green", "amber", "rose"].map((c) => <button key={c} onClick={() => { setAccent(c); notify(`Accent: ${c}`); }} className={`h-10 w-10 rounded-full border-2 transition-all hover:scale-110 ${accent === c ? "border-slate-900 ring-2 ring-slate-300" : "border-transparent"}`} style={{ background: c === "blue" ? "#3B82F6" : c === "indigo" ? "#6366F1" : c === "purple" ? "#A855F7" : c === "green" ? "#10B981" : c === "amber" ? "#F59E0B" : "#F43F5E" }} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
