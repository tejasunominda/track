import { useState } from "react";
import { Image, Trash2, Upload, Search } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface ImageItem { id: string; name: string; url: string; size: string; tags: string; }

const PLACEHOLDER = ["from-blue-400 to-indigo-500", "from-green-400 to-emerald-500", "from-amber-400 to-orange-500", "from-purple-400 to-pink-500", "from-red-400 to-rose-500", "from-cyan-400 to-blue-500"];

export function ImagesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<ImageItem[]>([
    { id: "img-1", name: "screenshot-bug.png", url: "", size: "240 KB", tags: "bug, ui" },
    { id: "img-2", name: "architecture-diagram.png", url: "", size: "1.2 MB", tags: "arch, docs" },
    { id: "img-3", name: "logo-design.png", url: "", size: "45 KB", tags: "brand" },
    { id: "img-4", name: "wireframe-v2.png", url: "", size: "320 KB", tags: "design, ui" },
    { id: "img-5", name: "data-flow.png", url: "", size: "580 KB", tags: "arch" },
    { id: "img-6", name: "user-flow.png", url: "", size: "180 KB", tags: "ux" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `img-${Date.now()}`, name, url: "", size: `${Math.floor(Math.random() * 500) + 50} KB`, tags: "" }]);
    setName(""); setShow(false); notify("Image uploaded");
  };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Image deleted"); };

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.tags.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Images</h1>
          <p className="text-sm text-slate-500">{items.length} images · {items.reduce((s, i) => s + parseFloat(i.size), 0).toFixed(0)} KB total</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Upload className="h-4 w-4" /> Upload
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Image filename (e.g. screenshot.png)" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Upload</button>
        </form>
      )}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((img, i) => (
          <div key={img.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${PLACEHOLDER[i % PLACEHOLDER.length]}`}>
              <Image className="h-12 w-12 text-white/60" />
            </div>
            <div className="p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="truncate text-sm font-bold text-slate-900">{img.name}</span>
                <button onClick={() => remove(img.id)} className="shrink-0 text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{img.size}</span>
                {img.tags && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-bold">{img.tags}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
