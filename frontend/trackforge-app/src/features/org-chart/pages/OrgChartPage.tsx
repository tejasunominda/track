import { useState } from "react";
import { Network, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function OrgChartPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "oc-1", name: "CEO", reportsTo: "Board" },
    { id: "oc-2", name: "VP Eng", reportsTo: "CEO" },
  ]);
  const [name, setName] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reportsTo.trim()) return;
    setItems((prev) => [...prev, { id: `oc-${Date.now()}`, name, reportsTo }]);
    setName("");
    setReportsTo("");
    setShow(false);
    notify("Node added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Org chart</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New node
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={reportsTo} onChange={(e) => setReportsTo(e.target.value)} placeholder="Reports to" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">Reports to {i.reportsTo}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
