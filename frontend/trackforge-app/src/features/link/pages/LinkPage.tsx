import { useState } from "react";
import { Link2, Plus, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface LinkItem { id: string; issue: string; url: string; type: "Web link" | "Issue link" | "Repository" | "Document"; }

export function LinkPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<LinkItem[]>([
    { id: "l-1", issue: "ENG-1", url: "https://github.com/track/eng/pull/42", type: "Repository" },
    { id: "l-2", issue: "ENG-2", url: "https://docs.trackforge.io/api", type: "Web link" },
    { id: "l-3", issue: "ENG-1", url: "ENG-5", type: "Issue link" },
    { id: "l-4", issue: "ENG-3", url: "https://confluence.trackforge.io/spec", type: "Document" },
  ]);
  const [issue, setIssue] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<LinkItem["type"]>("Web link");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim() || !url.trim()) return;
    setItems((p) => [...p, { id: `l-${Date.now()}`, issue, url, type }]);
    setIssue(""); setUrl(""); setShow(false); notify("Link added");
  };
  const remove = (id: string) => { setItems((p) => p.filter((l) => l.id !== id)); notify("Link removed"); };

  const tColor = { "Web link": "from-blue-500 to-indigo-600", "Issue link": "from-purple-500 to-pink-500", "Repository": "from-slate-700 to-slate-900", "Document": "from-amber-500 to-orange-500" };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Links</h1>
          <p className="text-sm text-slate-500">{items.length} links across issues</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New link
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]">
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue (e.g. ENG-1)" className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL or issue key" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={type} onChange={(e) => setType(e.target.value as LinkItem["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>Web link</option><option>Issue link</option><option>Repository</option><option>Document</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="space-y-2">
        {items.map((l) => (
          <div key={l.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${tColor[l.type]} text-white shadow-md`}><Link2 className="h-4 w-4" /></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{l.issue}</span>
                  <a href={l.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-sm text-blue-600 hover:underline">{l.url} <ExternalLink className="h-3 w-3" /></a>
                </div>
                <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{l.type}</span>
              </div>
            </div>
            <button onClick={() => remove(l.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
