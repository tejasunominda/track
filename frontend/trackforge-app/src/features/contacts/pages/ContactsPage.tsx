import { useState } from "react";
import { Mail, Plus, Trash2, Search, Phone } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Contact { id: string; name: string; email: string; role: string; phone: string; }

const rColor = { Owner: "bg-purple-100 text-purple-700", Admin: "bg-blue-100 text-blue-700", User: "bg-slate-100 text-slate-600", Guest: "bg-amber-100 text-amber-700" };

export function ContactsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Contact[]>([
    { id: "cn-1", name: "John Doe", email: "john@example.com", role: "Owner", phone: "+1 555-0100" },
    { id: "cn-2", name: "Jane Smith", email: "jane@example.com", role: "Admin", phone: "+1 555-0101" },
    { id: "cn-3", name: "Bob Wilson", email: "bob@example.com", role: "User", phone: "+1 555-0102" },
    { id: "cn-4", name: "Alice Brown", email: "alice@example.com", role: "Guest", phone: "+1 555-0103" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !email.trim()) return; setItems((p) => [...p, { id: `cn-${Date.now()}`, name, email, role: "User", phone: "" }]); setName(""); setEmail(""); setShow(false); notify("Contact created"); };
  const remove = (id: string) => { setItems((p) => p.filter((c) => c.id !== id)); notify("Contact removed"); };

  const roles = ["All", "Owner", "Admin", "User", "Guest"];
  const filtered = items.filter((c) => (roleFilter === "All" || c.role === roleFilter) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Contacts</h1><p className="text-sm text-slate-500">{items.length} contacts</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New contact</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {roles.map((r) => <button key={r} onClick={() => setRoleFilter(r)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${roleFilter === r ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{r}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-md">{c.name[0]}</div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${rColor[c.role as keyof typeof rColor] || rColor.User}`}>{c.role}</span>
                <button onClick={() => remove(c.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="font-bold text-slate-900">{c.name}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Mail className="h-3 w-3" /> {c.email}</div>
            {c.phone && <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><Phone className="h-3 w-3" /> {c.phone}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
