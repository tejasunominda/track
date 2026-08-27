import { useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface FlagItem { id: string; issue: string; reason: string; severity: "Info" | "Warning" | "Blocker"; flaggedBy: string; }

export function FlagsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<FlagItem[]>([
    { id: "fl-1", issue: "ENG-1", reason: "Needs design review before merge", severity: "Warning", flaggedBy: "Alice" },
    { id: "fl-2", issue: "ENG-3", reason: "Blocking production deploy", severity: "Blocker", flaggedBy: "Bob" },
    { id: "fl-3", issue: "ENG-5", reason: "Duplicate of ENG-2", severity: "Info", flaggedBy: "Charlie" },
  ]);
  const [issue, setIssue] = useState("");
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState<FlagItem["severity"]>("Warning");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setItems((p) => [...p, { id: `fl-${Date.now()}`, issue, reason, severity, flaggedBy: "Me" }]);
    setIssue(""); setReason(""); setShow(false); notify("Flag added");
  };
  const remove = (id: string) => { setItems((p) => p.filter((f) => f.id !== id)); notify("Flag removed"); };

  const filtered = items.filter((f) => f.issue.toLowerCase().includes(search.toLowerCase()) || f.reason.toLowerCase().includes(search.toLowerCase()));
  const sColor = { Info: "bg-blue-100 text-blue-700 border-blue-300", Warning: "bg-amber-100 text-amber-700 border-amber-300", Blocker: "bg-red-100 text-red-700 border-red-300" };
  const sIcon = { Info: "🔵", Warning: "⚠️", Blocker: "🚫" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Flags</h1>
          <p className="text-sm text-slate-500">{items.length} flags · {items.filter((f) => f.severity === "Blocker").length} blockers</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New flag
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_2fr_auto_auto]">
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for flag" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={severity} onChange={(e) => setSeverity(e.target.value as FlagItem["severity"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Info</option><option>Warning</option><option>Blocker</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search flags..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((f) => (
          <div key={f.id} className={`group flex items-center justify-between rounded-xl border-l-4 bg-white p-4 shadow-sm transition-all hover:shadow-md ${sColor[f.severity]}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg">{sIcon[f.severity]}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{f.issue}</span>
                  <span className="font-bold text-slate-900">{f.reason}</span>
                </div>
                <div className="mt-0.5 text-xs text-slate-500">{f.severity} · flagged by {f.flaggedBy}</div>
              </div>
            </div>
            <button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
