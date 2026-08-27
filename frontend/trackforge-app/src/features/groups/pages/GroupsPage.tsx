import { useState } from "react";
import { Users, Plus, Trash2, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Group { id: string; name: string; members: string[]; }

export function GroupsPage() {
  const { notify } = useToast();
  const [groups, setGroups] = useState<Group[]>([
    { id: "g-1", name: "Engineering", members: ["Alice", "Bob", "Charlie"] },
    { id: "g-2", name: "Design", members: ["Dana", "Eve"] },
    { id: "g-3", name: "QA", members: ["Frank"] },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setGroups((p) => [...p, { id: `g-${Date.now()}`, name, members: [] }]);
    setName(""); setShow(false); notify("Group created");
  };
  const addMember = (gid: string, member: string) => {
    if (!member.trim()) return;
    setGroups((p) => p.map((g) => (g.id === gid ? { ...g, members: [...g.members, member] } : g)));
    notify("Member added");
  };
  const removeMember = (gid: string, member: string) => {
    setGroups((p) => p.map((g) => (g.id === gid ? { ...g, members: g.members.filter((m) => m !== member) } : g)));
    notify("Member removed");
  };
  const remove = (id: string) => { setGroups((p) => p.filter((g) => g.id !== id)); notify("Group deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Groups</h1>
          <p className="text-sm text-slate-500">{groups.length} groups</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New group
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Group name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{g.name}</div>
                  <div className="text-xs text-slate-500">{g.members.length} members</div>
                </div>
              </div>
              <button onClick={() => remove(g.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mb-3 space-y-1">
              {g.members.map((m) => (
                <div key={m} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-sm transition-all hover:bg-slate-100">
                  <span className="font-medium text-slate-700">{m}</span>
                  <button onClick={() => removeMember(g.id, m)} className="text-slate-300 transition-all hover:text-red-500"><UserMinus className="h-3.5 w-3.5" /></button>
                </div>
              ))}
              {g.members.length === 0 && <div className="py-2 text-center text-xs text-slate-400">No members yet</div>}
            </div>
            <AddMember onAdd={(m) => addMember(g.id, m)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AddMember({ onAdd }: { onAdd: (m: string) => void }) {
  const [v, setV] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd(v); setV(""); }} className="flex gap-2">
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Add member..." className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
      <button type="submit" className="rounded-lg bg-slate-100 px-2 py-1.5 text-slate-600 hover:bg-slate-200"><UserPlus className="h-4 w-4" /></button>
    </form>
  );
}
