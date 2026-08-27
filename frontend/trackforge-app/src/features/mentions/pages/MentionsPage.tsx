import { useState } from "react";
import { AtSign, Search, MessageSquare, Bell, ExternalLink } from "lucide-react";

interface Mention { id: string; issue: string; from: string; text: string; time: string; read: boolean; }

export function MentionsPage() {
  const [items, setItems] = useState<Mention[]>([
    { id: "m-1", issue: "ENG-1", from: "Alice", text: "@you can you review this PR?", time: "5 min ago", read: false },
    { id: "m-2", issue: "ENG-3", from: "Bob", text: "Closing this, @you please verify", time: "1h ago", read: false },
    { id: "m-3", issue: "ENG-5", from: "Charlie", text: "@you this needs your expertise", time: "3h ago", read: true },
    { id: "m-4", issue: "ENG-2", from: "Dana", text: "Thanks @you for the fix!", time: "1d ago", read: true },
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Unread">("All");

  const markRead = (id: string) => setItems((p) => p.map((m) => (m.id === id ? { ...m, read: true } : m)));
  const markAllRead = () => { setItems((p) => p.map((m) => ({ ...m, read: true }))); };

  const filtered = items.filter((m) => (filter === "All" || !m.read) && (m.from.toLowerCase().includes(search.toLowerCase()) || m.text.toLowerCase().includes(search.toLowerCase()) || m.issue.toLowerCase().includes(search.toLowerCase())));
  const unread = items.filter((m) => !m.read).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mentions</h1>
          <p className="text-sm text-slate-500">{unread} unread mentions</p>
        </div>
        {unread > 0 && <button onClick={markAllRead} className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-200"><Bell className="h-4 w-4" /> Mark all read</button>}
      </div>
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search mentions..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <button onClick={() => setFilter("All")} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${filter === "All" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>All</button>
        <button onClick={() => setFilter("Unread")} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${filter === "Unread" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>Unread ({unread})</button>
      </div>
      <div className="space-y-2">
        {filtered.map((m) => (
          <div key={m.id} onClick={() => markRead(m.id)} className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${m.read ? "border-slate-200 bg-white" : "border-blue-300 bg-blue-50"}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md ${m.read ? "bg-gradient-to-br from-slate-400 to-slate-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}>
              <AtSign className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{m.issue}</span>
                <span className="text-sm font-bold text-slate-900">{m.from}</span>
                {!m.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                <span className="ml-auto text-xs text-slate-400">{m.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-700">{m.text}</p>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition-all group-hover:opacity-100" />
          </div>
        ))}
        {filtered.length === 0 && <div className="flex flex-col items-center py-16 text-slate-400"><MessageSquare className="mb-2 h-10 w-10" /><p className="text-sm">No mentions found</p></div>}
      </div>
    </div>
  );
}
