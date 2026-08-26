import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function VendorsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "v-1", name: "Acme Hosting", category: "Infrastructure" },
    { id: "v-2", name: "Design Studio", category: "Creative" },
  ]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Infrastructure");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `v-${Date.now()}`, name, category }]);
    setName("");
    setShow(false);
    notify("Vendor created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Vendors</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New vendor
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Vendor name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="Infrastructure">Infrastructure</option>
            <option value="Creative">Creative</option>
            <option value="Legal">Legal</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.category}</div>
              </div>
            </div>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">{i.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
