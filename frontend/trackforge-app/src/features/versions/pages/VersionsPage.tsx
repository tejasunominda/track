import { useState } from "react";
import { Calendar, Plus, Tag } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function VersionsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "v-1", name: "1.0.0", date: "2025-03-01", status: "Released" },
    { id: "v-2", name: "1.1.0", date: "2025-04-15", status: "Unreleased" },
  ]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `v-${Date.now()}`, name, date: date || "TBD", status: "Unreleased" }]);
    setName("");
    setDate("");
    setShow(false);
    notify("Version created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Versions</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New version
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 2.0.0" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Release date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((v) => (
          <div key={v.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{v.name}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500"><Calendar className="h-3 w-3" /> {v.date}</div>
              </div>
            </div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${v.status === "Released" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{v.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
