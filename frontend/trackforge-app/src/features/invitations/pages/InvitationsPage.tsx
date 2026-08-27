import { useState } from "react";
import { Mail, Plus, Send, Trash2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Invite { id: string; email: string; role: string; status: "Pending" | "Accepted" | "Expired"; sentAt: string; }

export function InvitationsPage() {
  const { notify } = useToast();
  const [invites, setInvites] = useState<Invite[]>([
    { id: "inv-1", email: "alice@example.com", role: "Developer", status: "Accepted", sentAt: "2 days ago" },
    { id: "inv-2", email: "bob@example.com", role: "Admin", status: "Pending", sentAt: "1 hour ago" },
    { id: "inv-3", email: "charlie@example.com", role: "Viewer", status: "Expired", sentAt: "1 week ago" },
  ]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Developer");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setInvites((p) => [...p, { id: `inv-${Date.now()}`, email, role, status: "Pending", sentAt: "just now" }]);
    setEmail(""); setShow(false); notify("Invitation sent");
  };
  const resend = (id: string) => {
    setInvites((p) => p.map((i) => (i.id === id ? { ...i, status: "Pending", sentAt: "just now" } : i)));
    notify("Invitation resent");
  };
  const remove = (id: string) => { setInvites((p) => p.filter((i) => i.id !== id)); notify("Invitation revoked"); };

  const sIcon = { Pending: Clock, Accepted: CheckCircle2, Expired: XCircle };
  const sColor = { Pending: "bg-amber-100 text-amber-700", Accepted: "bg-green-100 text-green-700", Expired: "bg-red-100 text-red-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invitations</h1>
          <p className="text-sm text-slate-500">{invites.filter((i) => i.status === "Pending").length} pending</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> Invite user
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Viewer</option><option>Developer</option><option>Admin</option>
          </select>
          <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"><Send className="h-4 w-4" /> Send</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {invites.map((i) => {
          const Icon = sIcon[i.status];
          return (
            <div key={i.id} className="group flex items-center justify-between p-4 transition-all hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{i.email}</div>
                  <div className="text-xs text-slate-500">{i.role} · sent {i.sentAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${sColor[i.status]}`}><Icon className="h-3 w-3" /> {i.status}</span>
                {i.status !== "Accepted" && <button onClick={() => resend(i.id)} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200">Resend</button>}
                <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
