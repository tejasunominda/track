import { useState } from "react";
import { ThumbsUp, Plus, Trash2, TrendingUp, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface VoteItem { id: string; issue: string; title: string; votes: number; voted: boolean; }

export function VotesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<VoteItem[]>([
    { id: "v-1", issue: "ENG-1", title: "Add dark mode", votes: 24, voted: false },
    { id: "v-2", issue: "ENG-2", title: "Export to PDF", votes: 18, voted: true },
    { id: "v-3", issue: "ENG-3", title: "Bulk import from Jira", votes: 42, voted: false },
    { id: "v-4", issue: "ENG-4", title: "Mobile app", votes: 67, voted: false },
  ]);
  const [issue, setIssue] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setItems((p) => [...p, { id: `v-${Date.now()}`, issue, title, votes: 0, voted: false }]);
    setIssue(""); setTitle(""); setShow(false); notify("Vote item created");
  };
  const vote = (id: string) => {
    setItems((p) => p.map((v) => (v.id === id ? { ...v, votes: v.voted ? v.votes - 1 : v.votes + 1, voted: !v.voted } : v)));
  };
  const remove = (id: string) => { setItems((p) => p.filter((v) => v.id !== id)); notify("Item removed"); };

  const filtered = items.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()) || v.issue.toLowerCase().includes(search.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => b.votes - a.votes);
  const totalVotes = items.reduce((s, v) => s + v.votes, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Votes</h1>
          <p className="text-sm text-slate-500">{items.length} items · {totalVotes} total votes</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New vote item
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_2fr_auto]">
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Feature title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {sorted.map((v, idx) => (
          <div key={v.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">#{idx + 1}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{v.issue}</span>
                  <span className="font-bold text-slate-900">{v.title}</span>
                </div>
                {idx === 0 && v.votes > 0 && <div className="mt-0.5 flex items-center gap-1 text-xs text-amber-600"><TrendingUp className="h-3 w-3" /> Most voted</div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => vote(v.id)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold transition-all hover:scale-105 ${v.voted ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                <ThumbsUp className={`h-4 w-4 ${v.voted ? "fill-white" : ""}`} /> {v.votes}
              </button>
              <button onClick={() => remove(v.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
