import { useState } from "react";
import { Plus, Tag, Trash2, Search, Rocket } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface ReleaseNote { id: string; version: string; notes: string; type: "Feature" | "Fix" | "Improvement" | "Security"; date: string; }

const tColor = { Feature: "bg-blue-100 text-blue-700", Fix: "bg-green-100 text-green-700", Improvement: "bg-purple-100 text-purple-700", Security: "bg-red-100 text-red-700" };

export function ReleaseNotesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<ReleaseNote[]>([
    { id: "rn-1", version: "Version notes", notes: "Bug fixes", type: "Fix", date: "Apr 1" },
    { id: "rn-2", version: "1.2.0", notes: "New dashboard", type: "Feature", date: "Mar 15" },
    { id: "rn-3", version: "1.1.5", notes: "Performance improvements", type: "Improvement", date: "Mar 1" },
    { id: "rn-4", version: "1.1.0", notes: "Security patch for XSS", type: "Security", date: "Feb 20" },
  ]);
  const [version, setVersion] = useState("");
  const [notes, setNotes] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!version.trim() || !notes.trim()) return; setItems((p) => [{ id: `rn-${Date.now()}`, version, notes, type: "Feature" as const, date: "Today" }, ...p]); setVersion(""); setNotes(""); setShow(false); notify("Release note added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Release note removed"); };

  const filtered = items.filter((i) => i.version.toLowerCase().includes(search.toLowerCase()) || i.notes.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Release notes</h1><p className="text-sm text-slate-500">{items.length} releases</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Version" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search release notes..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="relative pl-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200">
        {filtered.map((i) => (
          <div key={i.id} className="group relative mb-3">
            <span className="absolute -left-4 top-3 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-slate-50" />
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm"><Rocket className="h-4 w-4" /></div>
                  <div>
                    <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{i.version}</span><span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${tColor[i.type]}`}><Tag className="h-2.5 w-2.5" /> {i.type}</span></div>
                    <div className="mt-0.5 text-xs text-slate-500">{i.notes}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2"><span className="text-xs text-slate-400">{i.date}</span><button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
