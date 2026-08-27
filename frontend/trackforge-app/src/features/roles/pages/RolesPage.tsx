import { useState } from "react";
import { Shield, Plus, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const ALL_PERMS = ["Create", "Read", "Update", "Delete", "Admin"];

interface Role { id: string; name: string; description: string; permissions: string[]; }

export function RolesPage() {
  const { notify } = useToast();
  const [roles, setRoles] = useState<Role[]>([
    { id: "r-1", name: "Admin", description: "Full system access", permissions: [...ALL_PERMS] },
    { id: "r-2", name: "Developer", description: "Manage issues and boards", permissions: ["Create", "Read", "Update"] },
    { id: "r-3", name: "Viewer", description: "Read-only access", permissions: ["Read"] },
  ]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setRoles((p) => [...p, { id: `r-${Date.now()}`, name, description: desc, permissions: ["Read"] }]);
    setName(""); setDesc(""); setShow(false); notify("Role created");
  };
  const togglePerm = (id: string, perm: string) => {
    setRoles((p) => p.map((r) => (r.id === id ? { ...r, permissions: r.permissions.includes(perm) ? r.permissions.filter((x) => x !== perm) : [...r.permissions, perm] } : r)));
    notify("Permission updated");
  };
  const remove = (id: string) => { setRoles((p) => p.filter((r) => r.id !== id)); notify("Role deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Roles</h1>
          <p className="text-sm text-slate-500">{roles.length} roles configured</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New role
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Role name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="space-y-4">
        {roles.map((r) => (
          <div key={r.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.description}</div>
                </div>
              </div>
              <button onClick={() => remove(r.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_PERMS.map((p) => {
                const on = r.permissions.includes(p);
                return (
                  <button key={p} onClick={() => togglePerm(r.id, p)} className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 ${on ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {on ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
