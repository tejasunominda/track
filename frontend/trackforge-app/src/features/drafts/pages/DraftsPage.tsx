import { useState } from "react";
import { FileEdit, Plus, Trash2, RotateCcw, Clock } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Draft { id: string; title: string; body: string; updatedAt: string; }

export function DraftsPage() {
  const { notify } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([
    { id: "d-1", title: "Q1 roadmap draft", body: "Focus on performance and multi-tenancy improvements...", updatedAt: "1h ago" },
    { id: "d-2", title: "API v2 proposal", body: "Redesign REST endpoints with pagination and filtering...", updatedAt: "3h ago" },
    { id: "d-3", title: "Hiring plan", body: "Need 2 backend engineers and 1 designer for Q1...", updatedAt: "1d ago" },
  ]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setDrafts((p) => [...p, { id: `d-${Date.now()}`, title, body, updatedAt: "just now" }]);
    setTitle(""); setBody(""); setShow(false); notify("Draft saved");
  };
  const restore = (d: Draft) => {
    setTitle(d.title); setBody(d.body); setShow(true);
    notify("Draft restored to editor");
  };
  const remove = (id: string) => { setDrafts((p) => p.filter((d) => d.id !== id)); notify("Draft deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Drafts</h1>
          <p className="text-sm text-slate-500">{drafts.length} saved drafts</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New draft
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Draft title" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Draft content..." rows={4} className="resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save draft</button>
        </form>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {drafts.map((d) => (
          <div key={d.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md"><FileEdit className="h-4 w-4" /></div>
                <span className="font-bold text-slate-900">{d.title}</span>
              </div>
              <button onClick={() => remove(d.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mb-3 line-clamp-3 text-sm text-slate-600">{d.body || "(empty)"}</p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" /> {d.updatedAt}</span>
              <button onClick={() => restore(d)} className="flex items-center gap-1 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 transition-all hover:bg-blue-200"><RotateCcw className="h-3 w-3" /> Restore</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
