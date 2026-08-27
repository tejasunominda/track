import { useState } from "react";
import { Globe, Plus, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface PortalConfig { id: string; name: string; url: string; visible: boolean; articles: number; }

export function PortalPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<PortalConfig[]>([
    { id: "p-1", name: "Customer Support", url: "https://support.trackforge.io", visible: true, articles: 24 },
    { id: "p-2", name: "IT Helpdesk", url: "https://it.trackforge.io", visible: true, articles: 18 },
    { id: "p-3", name: "Internal Wiki", url: "https://wiki.trackforge.io", visible: false, articles: 56 },
  ]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `p-${Date.now()}`, name, url, visible: true, articles: 0 }]);
    setName(""); setUrl(""); setShow(false); notify("Portal added");
  };
  const toggle = (id: string) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
    notify("Visibility toggled");
  };
  const remove = (id: string) => { setItems((p) => p.filter((x) => x.id !== id)); notify("Portal removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portal</h1>
          <p className="text-sm text-slate-500">{items.filter((p) => p.visible).length} visible portals</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New portal
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Portal name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
              <Globe className="h-10 w-10 text-white/80" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-slate-900">{p.name}</span>
                <button onClick={() => toggle(p.id)} className={`rounded-full p-1.5 transition-all hover:scale-110 ${p.visible ? "text-green-600" : "text-slate-400"}`}>
                  {p.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="mb-3 flex items-center gap-1 truncate font-mono text-xs text-blue-600 hover:underline">
                {p.url} <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
              <div className="mb-3 text-xs text-slate-500">{p.articles} knowledge base articles</div>
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${p.visible ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{p.visible ? "VISIBLE" : "HIDDEN"}</span>
                <button onClick={() => remove(p.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
