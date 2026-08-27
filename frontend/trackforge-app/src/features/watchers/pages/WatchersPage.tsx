import { useState } from "react";
import { Eye, EyeOff, Plus, Trash2, Bell, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Watcher { id: string; issue: string; title: string; watching: boolean; notify: boolean; }

export function WatchersPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Watcher[]>([
    { id: "w-1", issue: "ENG-1", title: "Fix login bug", watching: true, notify: true },
    { id: "w-2", issue: "ENG-2", title: "Add dark mode", watching: true, notify: false },
    { id: "w-3", issue: "ENG-3", title: "API rate limit", watching: false, notify: false },
    { id: "w-4", issue: "ENG-4", title: "Update docs", watching: true, notify: true },
  ]);
  const [issue, setIssue] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setItems((p) => [...p, { id: `w-${Date.now()}`, issue, title, watching: true, notify: true }]);
    setIssue(""); setTitle(""); setShow(false); notify("Now watching issue");
  };
  const toggleWatch = (id: string) => {
    setItems((p) => p.map((w) => (w.id === id ? { ...w, watching: !w.watching } : w)));
    notify("Watch toggled");
  };
  const toggleNotify = (id: string) => {
    setItems((p) => p.map((w) => (w.id === id ? { ...w, notify: !w.notify } : w)));
  };
  const remove = (id: string) => { setItems((p) => p.filter((w) => w.id !== id)); notify("Removed"); };

  const filtered = items.filter((w) => w.issue.toLowerCase().includes(search.toLowerCase()) || w.title.toLowerCase().includes(search.toLowerCase()));
  const watching = items.filter((w) => w.watching).length;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Watchers</h1>
          <p className="text-sm text-slate-500">Watching {watching} of {items.length} issues</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> Watch issue
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_2fr_auto]">
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Watch</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search watched issues..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((w) => (
          <div key={w.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <button onClick={() => toggleWatch(w.id)} className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-110 ${w.watching ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                {w.watching ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{w.issue}</span>
                  <span className="font-bold text-slate-900">{w.title}</span>
                </div>
                <div className="mt-0.5 text-xs text-slate-500">{w.watching ? "You are watching" : "Not watching"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {w.watching && (
                <button onClick={() => toggleNotify(w.id)} className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all hover:scale-105 ${w.notify ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}>
                  <Bell className="h-3 w-3" /> {w.notify ? "Notify" : "Silent"}
                </button>
              )}
              <button onClick={() => remove(w.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
