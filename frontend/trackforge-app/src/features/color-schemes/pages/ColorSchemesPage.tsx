import { useState } from "react";
import { Palette, Plus, Trash2, Check } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Scheme { id: string; name: string; primary: string; bg: string; active: boolean; }

export function ColorSchemesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Scheme[]>([
    { id: "cs-1", name: "Ocean Blue", primary: "#2563EB", bg: "#F8FAFC", active: true },
    { id: "cs-2", name: "Forest Green", primary: "#10B981", bg: "#F0FDF4", active: false },
    { id: "cs-3", name: "Sunset Orange", primary: "#F97316", bg: "#FFF7ED", active: false },
    { id: "cs-4", name: "Royal Purple", primary: "#7C3AED", bg: "#FAF5FF", active: false },
  ]);
  const [name, setName] = useState("");
  const [primary, setPrimary] = useState("#2563EB");
  const [bg, setBg] = useState("#F8FAFC");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `cs-${Date.now()}`, name, primary, bg, active: false }]);
    setName(""); setShow(false); notify("Scheme created");
  };
  const activate = (id: string) => {
    setItems((p) => p.map((s) => ({ ...s, active: s.id === id })));
    notify("Scheme activated");
  };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Scheme deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Color schemes</h1>
          <p className="text-sm text-slate-500">{items.length} schemes</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New scheme
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Scheme name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm">Primary <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="h-5 w-5 cursor-pointer rounded" /></label>
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm">BG <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-5 w-5 cursor-pointer rounded" /></label>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <div key={s.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex h-24 items-center justify-center transition-all" style={{ background: `linear-gradient(135deg, ${s.primary}, ${s.bg})` }}>
              <Palette className="h-8 w-8 text-white/80" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-slate-900">{s.name}</span>
                {s.active && <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700"><Check className="h-3 w-3" /> Active</span>}
              </div>
              <div className="mb-3 flex gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><span className="h-3 w-3 rounded" style={{ background: s.primary }} /> {s.primary}</span>
                <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-slate-200" style={{ background: s.bg }} /> {s.bg}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => activate(s.id)} disabled={s.active} className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Activate</button>
                <button onClick={() => remove(s.id)} className="rounded-lg bg-slate-100 px-2 py-1.5 text-slate-500 transition-all hover:bg-red-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
