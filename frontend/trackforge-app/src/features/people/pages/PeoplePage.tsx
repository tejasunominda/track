import { useEffect, useState } from "react";
import { Mail, UserPlus, Trash2, Search } from "lucide-react";
import { listUsers, User as UserType } from "@/features/people/api/people";
import { useToast } from "@/app/ToastProvider";

export function PeoplePage() {
  const { notify } = useToast();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Member");

  useEffect(() => { setLoading(true); listUsers().then((d) => { setUsers(d); setLoading(false); }).catch(console.error); }, []);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setUsers((p) => [...p, { id: `u-${Date.now()}`, name: newName, email: newEmail, role: newRole } as UserType]);
    setNewName(""); setNewEmail(""); setShow(false); notify("User invited");
  };
  const remove = (id: string) => { setUsers((p) => p.filter((u) => u.id !== id)); notify("User removed"); };
  const changeRole = (id: string, role: string) => { setUsers((p) => p.map((u) => u.id === id ? { ...u, role } : u)); notify("Role updated"); };

  const roles = ["All", "Admin", "Member", "Viewer", "Guest"];
  const filtered = users.filter((u) => (roleFilter === "All" || u.role === roleFilter) && (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())));

  const roleColor: Record<string, string> = { Admin: "bg-purple-100 text-purple-700", Member: "bg-blue-100 text-blue-700", Viewer: "bg-slate-100 text-slate-600", Guest: "bg-amber-100 text-amber-700" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">People</h1><p className="text-sm text-slate-500">{users.length} members · {users.filter((u) => u.role === "Admin").length} admins</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><UserPlus className="h-4 w-4" /> Invite</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Full name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Email address" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Admin</option><option>Member</option><option>Viewer</option><option>Guest</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Invite</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search people..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {roles.map((r) => <button key={r} onClick={() => setRoleFilter(r)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${roleFilter === r ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{r}</button>)}
      </div>
      {loading ? <div className="p-6 text-slate-500">Loading people…</div> : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr className="text-xs font-bold uppercase text-slate-500"><th className="px-4 py-3 text-left">Member</th><th className="px-4 py-3 text-left">Role</th><th className="px-4 py-3"></th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="group transition-all hover:bg-slate-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">{u.name[0]}</div><div><div className="font-semibold text-slate-900">{u.name}</div><div className="flex items-center gap-1 text-xs text-slate-400"><Mail className="h-3 w-3" /> {u.email}</div></div></div></td>
                  <td className="px-4 py-3"><select value={u.role} onChange={(e) => changeRole(u.id, e.target.value)} className={`rounded-full border-0 px-2.5 py-1 text-xs font-bold outline-none ${roleColor[u.role] || "bg-slate-100"}`}><option>Admin</option><option>Member</option><option>Viewer</option><option>Guest</option></select></td>
                  <td className="px-4 py-3 text-right"><button onClick={() => remove(u.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
