import { useState } from "react";
import { Image, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function AssetsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "as-1", name: "Logo", type: "Image" },
    { id: "as-2", name: "Style guide", type: "PDF" },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Image");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `as-${Date.now()}`, name, type }]);
    setName("");
    setShow(false);
    notify("Asset uploaded");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Assets</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New asset
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="Image">Image</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Design">Design</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 font-bold text-slate-900"><Image className="h-5 w-5 text-slate-400" /> {i.name}</div>
            <div className="text-sm text-slate-500">{i.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
