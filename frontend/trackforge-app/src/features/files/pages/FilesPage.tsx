import { useState } from "react";
import { File, Plus, Trash2, Search, Download, FileText, Image, Film, FileCode } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface FileItem { id: string; name: string; size: string; type: string; }

const fIcon: Record<string, typeof File> = { pdf: FileText, png: Image, jpg: Image, mp4: Film, js: FileCode, default: File };
const fColor: Record<string, string> = { pdf: "from-red-500 to-rose-600", png: "from-blue-500 to-indigo-600", jpg: "from-blue-500 to-indigo-600", mp4: "from-purple-500 to-pink-500", js: "from-amber-500 to-orange-500" };

export function FilesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<FileItem[]>([
    { id: "f-1", name: "specs.pdf", size: "1.2 MB", type: "pdf" },
    { id: "f-2", name: "logo.png", size: "0.3 MB", type: "png" },
    { id: "f-3", name: "demo.mp4", size: "12.5 MB", type: "mp4" },
    { id: "f-4", name: "app.js", size: "0.05 MB", type: "js" },
  ]);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || !size.trim()) return; const ext = name.split(".").pop() || "default"; setItems((p) => [...p, { id: `f-${Date.now()}`, name, size, type: ext }]); setName(""); setSize(""); setShow(false); notify("File added"); };
  const remove = (id: string) => { setItems((p) => p.filter((f) => f.id !== id)); notify("File deleted"); };
  const download = (name: string) => notify(`Downloading ${name}`);

  const filtered = items.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Files</h1><p className="text-sm text-slate-500">{items.length} files</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New file</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="File name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={size} onChange={(e) => setSize(e.target.value)} placeholder="Size" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          <button onClick={() => setView("grid")} className={`rounded px-3 py-1 text-xs font-bold transition-all ${view === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>Grid</button>
          <button onClick={() => setView("list")} className={`rounded px-3 py-1 text-xs font-bold transition-all ${view === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>List</button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((f) => {
            const Icon = fIcon[f.type] || fIcon.default;
            return (
              <div key={f.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${fColor[f.type] || "from-slate-400 to-slate-600"} text-white shadow-md`}><Icon className="h-6 w-6" /></div>
                  <button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="truncate font-bold text-slate-900">{f.name}</div>
                <div className="mt-1 flex items-center justify-between"><span className="text-xs text-slate-400">{f.size}</span><button onClick={() => download(f.name)} className="text-blue-500 opacity-0 transition-all hover:text-blue-700 group-hover:opacity-100"><Download className="h-4 w-4" /></button></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {filtered.map((f) => {
            const Icon = fIcon[f.type] || fIcon.default;
            return (
              <div key={f.id} className="group flex items-center justify-between border-b border-slate-100 p-3 transition-all hover:bg-slate-50">
                <div className="flex items-center gap-3"><div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${fColor[f.type] || "from-slate-400 to-slate-600"} text-white shadow-sm`}><Icon className="h-4 w-4" /></div><span className="font-medium text-slate-900">{f.name}</span><span className="text-xs text-slate-400">{f.size}</span></div>
                <div className="flex items-center gap-2"><button onClick={() => download(f.name)} className="text-blue-500 opacity-0 transition-all group-hover:opacity-100"><Download className="h-4 w-4" /></button><button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
