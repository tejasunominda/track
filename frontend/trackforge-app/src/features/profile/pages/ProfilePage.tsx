import { useState } from "react";
import { Camera, Mail, Shield, User, Key, Bell, Activity, Edit3 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

type Tab = "Profile" | "Security" | "Notifications" | "Activity";

export function ProfilePage() {
  const { notify } = useToast();
  const [tab, setTab] = useState<Tab>("Profile");
  const [name, setName] = useState("Devin User");
  const [email, setEmail] = useState("user@trackforge.io");
  const [role, setRole] = useState("Admin");
  const [bio, setBio] = useState("Full-stack developer passionate about building great products.");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [twoFA, setTwoFA] = useState(false);
  const [sessions, setSessions] = useState([
    { id: "s-1", device: "Chrome on macOS", location: "San Francisco, CA", current: true },
    { id: "s-2", device: "Safari on iPhone", location: "San Francisco, CA", current: false },
  ]);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [mentionAlert, setMentionAlert] = useState(true);
  const [activity] = useState([
    { id: "a-1", action: "Created issue", target: "ENG-42", time: "2h ago" },
    { id: "a-2", action: "Commented on", target: "ENG-38", time: "5h ago" },
    { id: "a-3", action: "Closed issue", target: "ENG-30", time: "1d ago" },
    { id: "a-4", action: "Updated sprint", target: "Sprint 12", time: "2d ago" },
  ]);

  const save = (e: React.FormEvent) => { e.preventDefault(); notify("Profile saved"); };
  const changePass = (e: React.FormEvent) => { e.preventDefault(); setCurrentPass(""); setNewPass(""); notify("Password changed"); };
  const revokeSession = (id: string) => { setSessions((p) => p.filter((s) => s.id !== id)); notify("Session revoked"); };

  const tabs: { id: Tab; icon: typeof User }[] = [{ id: "Profile", icon: User }, { id: "Security", icon: Shield }, { id: "Notifications", icon: Bell }, { id: "Activity", icon: Activity }];
  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (<button onClick={onClick} className={`relative h-6 w-11 rounded-full transition-all ${on ? "bg-blue-600" : "bg-slate-300"}`}><div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${on ? "left-[22px]" : "left-0.5"}`} /></button>);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your profile</h1>
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-md">{name[0]}<button className="absolute -bottom-1 -right-1 rounded-full bg-white p-1.5 text-slate-400 shadow-md hover:text-blue-600"><Camera className="h-4 w-4" /></button></div>
        <div><div className="text-lg font-bold text-slate-900">{name}</div><div className="text-sm text-slate-500">{email}</div><div className="mt-1 flex items-center gap-2"><span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700">{role}</span><span className="text-xs text-slate-400">{activity.length} recent actions</span></div></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
        <div className="space-y-1">{tabs.map((t) => { const Icon = t.icon; return <button key={t.id} onClick={() => setTab(t.id)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-all ${tab === t.id ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-200" : "text-slate-600 hover:bg-white/60"}`}><Icon className="h-4 w-4" /> {t.id}</button>; })}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {tab === "Profile" && (
            <form onSubmit={save} className="space-y-4">
              <div><label className="mb-1 flex items-center gap-1 text-sm font-bold text-slate-700"><User className="h-3.5 w-3.5" /> Display name</label><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" /></div>
              <div><label className="mb-1 flex items-center gap-1 text-sm font-bold text-slate-700"><Mail className="h-3.5 w-3.5" /> Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" /></div>
              <div><label className="mb-1 flex items-center gap-1 text-sm font-bold text-slate-700"><Shield className="h-3.5 w-3.5" /> Role</label><select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500"><option>Admin</option><option>Member</option><option>Viewer</option></select></div>
              <div><label className="mb-1 flex items-center gap-1 text-sm font-bold text-slate-700"><Edit3 className="h-3.5 w-3.5" /> Bio</label><textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full resize-none rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" /></div>
              <button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">Edit profile</button>
            </form>
          )}
          {tab === "Security" && (
            <div className="space-y-5">
              <form onSubmit={changePass} className="space-y-3 rounded-lg border border-slate-200 p-4">
                <h3 className="flex items-center gap-1 text-sm font-bold text-slate-700"><Key className="h-4 w-4" /> Change password</h3>
                <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="Current password" className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" />
                <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="New password" className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500" />
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Update password</button>
              </form>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4"><div><div className="font-bold text-slate-900">Two-factor authentication</div><div className="text-xs text-slate-500">Add an extra layer of security</div></div><Toggle on={twoFA} onClick={() => { setTwoFA(!twoFA); notify(`2FA ${!twoFA ? "enabled" : "disabled"}`); }} /></div>
              <div><h3 className="mb-2 text-sm font-bold text-slate-700">Active sessions</h3><div className="space-y-2">{sessions.map((s) => (<div key={s.id} className="group flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:bg-slate-50"><div><div className="text-sm font-bold text-slate-900">{s.device}</div><div className="text-xs text-slate-500">{s.location}</div></div>{s.current ? <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">Current</span> : <button onClick={() => revokeSession(s.id)} className="rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-200">Revoke</button>}</div>))}</div></div>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-3">
              {[["Email notifications", emailNotif, setEmailNotif, "Receive updates via email"], ["Push notifications", pushNotif, setPushNotif, "Browser push alerts"], ["Mention alerts", mentionAlert, setMentionAlert, "When someone @mentions you"]].map(([label, val, set, desc]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition-all hover:bg-slate-50"><div><div className="font-bold text-slate-900">{label as string}</div><div className="text-xs text-slate-500">{desc as string}</div></div><Toggle on={val as boolean} onClick={() => (set as (v: boolean) => void)(!(val as boolean))} /></div>
              ))}
            </div>
          )}
          {tab === "Activity" && (
            <div className="space-y-2">{activity.map((a) => (<div key={a.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-all hover:bg-slate-50"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100"><Activity className="h-4 w-4 text-blue-600" /></div><div className="flex-1"><span className="text-sm text-slate-700">{a.action} </span><span className="font-mono text-sm font-bold text-slate-900">{a.target}</span></div><span className="text-xs text-slate-400">{a.time}</span></div>))}</div>
          )}
        </div>
      </div>
    </div>
  );
}
