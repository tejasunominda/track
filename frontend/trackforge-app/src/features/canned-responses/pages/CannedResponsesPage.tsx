import { useState } from "react";
import { MessageSquare, Plus, Trash2, Copy, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Canned { id: string; name: string; body: string; uses: number; }

export function CannedResponsesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Canned[]>([
    { id: "cr-1", name: "Greeting", body: "Hi there! Thanks for reaching out. How can I help you today?", uses: 142 },
    { id: "cr-2", name: "Escalate", body: "I'm escalating this to our engineering team. You'll hear back within 24 hours.", uses: 38 },
    { id: "cr-3", name: "Resolved", body: "Glad we could help! Please let us know if you have any other questions.", uses: 89 },
  ]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `cr-${Date.now()}`, name, body, uses: 0 }]);
    setName(""); setBody(""); setShow(false); notify("Canned response created");
  };
  const copy = (c: Canned) => {
    navigator.clipboard?.writeText(c.body).catch(() => {});
    setItems((p) => p.map((x) => (x.id === c.id ? { ...x, uses: x.uses + 1 } : x)));
    notify("Copied to clipboard");
  };
  const remove = (id: string) => { setItems((p) => p.filter((c) => c.id !== id)); notify("Response deleted"); };

  const filtered = items.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.body.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Canned responses</h1>
          <p className="text-sm text-slate-500">{items.length} templates · {items.reduce((s, c) => s + c.uses, 0)} total uses</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New response
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Response name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Response body..." rows={3} className="resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search responses..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.id} className="group flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><MessageSquare className="h-4 w-4" /></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{c.name}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{c.uses} uses</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{c.body}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => copy(c)} className="rounded-lg bg-slate-100 p-1.5 text-slate-600 transition-all hover:bg-blue-100 hover:text-blue-700"><Copy className="h-4 w-4" /></button>
              <button onClick={() => remove(c.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
