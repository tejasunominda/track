import { useState } from "react";
import { Plus, Trash2, Search, Type, Hash, Calendar, List } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CustomField { id: string; name: string; type: "Text" | "Number" | "Select" | "Date"; }

const tIcon = { Text: Type, Number: Hash, Select: List, Date: Calendar };
const tColor = { Text: "from-blue-500 to-indigo-600", Number: "from-green-500 to-emerald-600", Select: "from-purple-500 to-pink-500", Date: "from-amber-500 to-orange-500" };

export function CustomFieldsPage() {
  const { notify } = useToast();
  const [fields, setFields] = useState<CustomField[]>([
    { id: "cf-1", name: "Severity", type: "Select" },
    { id: "cf-2", name: "Customer", type: "Text" },
    { id: "cf-3", name: "Story Points", type: "Number" },
    { id: "cf-4", name: "Due Date", type: "Date" },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState<CustomField["type"]>("Text");
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setFields((p) => [...p, { id: `cf-${Date.now()}`, name, type }]); setName(""); notify("Custom field created"); };
  const remove = (id: string) => { setFields((p) => p.filter((f) => f.id !== id)); notify("Custom field removed"); };

  const filtered = fields.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.type.toLowerCase().includes(search.toLowerCase()));
  const typeCounts = { Text: fields.filter((f) => f.type === "Text").length, Number: fields.filter((f) => f.type === "Number").length, Select: fields.filter((f) => f.type === "Select").length, Date: fields.filter((f) => f.type === "Date").length };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Custom fields</h1>
        <p className="text-sm text-slate-500">Define extra issue attributes. {fields.length} fields configured.</p>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-3">
        {(Object.keys(typeCounts) as CustomField["type"][]).map((t) => {
          const Icon = tIcon[t];
          return (
            <div key={t} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className={`mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${tColor[t]} text-white shadow-sm`}><Icon className="h-3.5 w-3.5" /></div>
              <div className="text-lg font-bold text-slate-900">{typeCounts[t]}</div>
              <div className="text-[10px] text-slate-400">{t}</div>
            </div>
          );
        })}
      </div>
      <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Field name" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value as CustomField["type"])} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Text</option><option>Number</option><option>Select</option><option>Date</option></select>
        <button type="submit" className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> Add</button>
      </form>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search custom fields..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => {
          const Icon = tIcon[f.type];
          return (
            <div key={f.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tColor[f.type]} text-white shadow-md`}><Icon className="h-5 w-5" /></span>
                <div><div className="font-bold text-slate-900">{f.name}</div><div className="text-xs text-slate-400">{f.type} field</div></div>
              </div>
              <button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
