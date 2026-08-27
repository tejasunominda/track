import { useState } from "react";
import { Plus, Users, Trash2, Search, UserPlus, UserMinus, ChevronRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Team { id: string; name: string; members: { id: string; name: string; role: string }[]; }

export function TeamsPage() {
  const { notify } = useToast();
  const [teams, setTeams] = useState<Team[]>([
    { id: "t-1", name: "DevOps", members: [{ id: "u-1", name: "Alice", role: "Lead" }, { id: "u-2", name: "Bob", role: "Engineer" }, { id: "u-3", name: "Eve", role: "Engineer" }] },
    { id: "t-2", name: "Frontend", members: [{ id: "u-4", name: "Charlie", role: "Lead" }, { id: "u-5", name: "Dana", role: "Developer" }] },
    { id: "t-3", name: "Backend", members: [{ id: "u-6", name: "Frank", role: "Lead" }] },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>("t-1");
  const [memberName, setMemberName] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setTeams((p) => [...p, { id: `t-${Date.now()}`, name, members: [] }]); setName(""); setShow(false); notify("Team created"); };
  const remove = (id: string) => { setTeams((p) => p.filter((t) => t.id !== id)); notify("Team deleted"); };
  const addMember = (teamId: string) => { if (!memberName.trim()) return; setTeams((p) => p.map((t) => t.id === teamId ? { ...t, members: [...t.members, { id: `u-${Date.now()}`, name: memberName, role: "Member" }] } : t)); setMemberName(""); notify("Member added"); };
  const removeMember = (teamId: string, memberId: string) => { setTeams((p) => p.map((t) => t.id === teamId ? { ...t, members: t.members.filter((m) => m.id !== memberId) } : t)); notify("Member removed"); };
  const toggle = (id: string) => setExpanded((p) => p === id ? null : id);

  const filtered = teams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
  const totalMembers = teams.reduce((s, t) => s + t.members.length, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Teams</h1><p className="text-sm text-slate-500">{teams.length} teams · {totalMembers} members</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New team</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Team name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teams..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-3">
        {filtered.map((t) => (
          <div key={t.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="group flex items-center justify-between p-4">
              <button onClick={() => toggle(t.id)} className="flex flex-1 items-center gap-3 text-left">
                <ChevronRight className={`h-4 w-4 text-slate-400 transition-all ${expanded === t.id ? "rotate-90" : ""}`} />
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Users className="h-5 w-5" /></div>
                <div><div className="font-bold text-slate-900">{t.name}</div><div className="text-xs text-slate-500">{t.members.length} members</div></div>
              </button>
              <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            {expanded === t.id && (
              <div className="border-t border-slate-100 bg-slate-50 p-4">
                <div className="mb-3 space-y-1.5">
                  {t.members.map((m) => (
                    <div key={m.id} className="group flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{m.name[0]}</div>
                        <span className="text-sm font-medium text-slate-900">{m.name}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{m.role}</span>
                      </div>
                      <button onClick={() => removeMember(t.id, m.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><UserMinus className="h-3.5 w-3.5" /></button>
                    </div>
                  ))}
                  {t.members.length === 0 && <div className="text-sm text-slate-400">No members yet</div>}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); addMember(t.id); }} className="flex gap-2">
                  <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Add member name..." className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
                  <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"><UserPlus className="h-3.5 w-3.5" /> Add</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
