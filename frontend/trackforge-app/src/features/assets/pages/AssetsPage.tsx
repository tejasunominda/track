import { useState } from "react";
import { Image, Plus, Trash2, Search, FileText, Video, Palette, Download } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Asset { id: string; name: string; type: "Image" | "PDF" | "Video" | "Design"; size: string; }

const tIcon = { Image: Image, PDF: FileText, Video: Video, Design: Palette };
const tColor = { Image: "from-blue-500 to-indigo-600", PDF: "from-red-500 to-rose-600", Video: "from-purple-500 to-pink-500", Design: "from-amber-500 to-orange-500" };

export function AssetsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Asset[]>([
    { id: "as-1", name: "Logo", type: "Image", size: "1.2 MB" },
    { id: "as-2", name: "Style guide", type: "PDF", size: "3.4 MB" },
    { id: "as-3", name: "Product demo", type: "Video", size: "45 MB" },
    { id: "as-4", name: "Dashboard mockup", type: "Design", size: "8.7 MB" },
    { id: "as-5", name: "Brand colors", type: "Design", size: "0.2 MB" },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Asset["type"]>("Image");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim()) return; setItems((p) => [...p, { id: `as-${Date.now()}`, name, type, size: "0.1 MB" }]); setName(""); setShow(false); notify("Asset uploaded"); };
  const remove = (id: string) => { setItems((p) => p.filter((a) => a.id !== id)); notify("Asset deleted"); };
  const download = (name: string) => notify(`Downloading ${name}`);

  const types = ["All", "Image", "PDF", "Video", "Design"];
  const filtered = items.filter((a) => (typeFilter === "All" || a.type === typeFilter) && a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Assets</h1><p className="text-sm text-slate-500">{items.length} assets · {items.reduce((s, a) => s + parseFloat(a.size), 0).toFixed(1)} MB total</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New asset</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <select value={type} onChange={(e) => setType(e.target.value as Asset["type"])} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"><option>Image</option><option>PDF</option><option>Video</option><option>Design</option></select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {types.map((t) => <button key={t} onClick={() => setTypeFilter(t)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${typeFilter === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{t}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const Icon = tIcon[a.type];
          return (
            <div key={a.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tColor[a.type]} text-white shadow-md`}><Icon className="h-6 w-6" /></div>
                <div className="flex items-center gap-1">
                  <button onClick={() => download(a.name)} className="rounded-lg bg-slate-100 p-2 text-slate-500 transition-all hover:bg-slate-200 hover:text-blue-600"><Download className="h-4 w-4" /></button>
                  <button onClick={() => remove(a.id)} className="rounded-lg bg-slate-100 p-2 text-slate-500 opacity-0 transition-all hover:bg-red-100 hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="font-bold text-slate-900">{a.name}</div>
              <div className="mt-1 flex items-center gap-2"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{a.type}</span><span className="text-xs text-slate-400">{a.size}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
