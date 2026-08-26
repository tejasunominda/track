import { useState } from "react";
import { Package, Plus, Rocket } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ReleasesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "r-1", name: "v1.0.0", date: "2025-01-15", status: "Shipped" },
    { id: "r-2", name: "v1.1.0", date: "2025-03-01", status: "Shipped" },
  ]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `r-${Date.now()}`, name, date: date || "TBD", status: "Planned" }]);
    setName("");
    setDate("");
    setShow(false);
    notify("Release created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Releases</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New release
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Release name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.date}</div>
              </div>
            </div>
            <span className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Shipped" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
              <Rocket className="h-3 w-3" /> {i.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
