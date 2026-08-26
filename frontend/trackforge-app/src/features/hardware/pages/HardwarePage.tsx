import { useState } from "react";
import { HardDrive, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function HardwarePage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "hw-1", name: "MacBook", owner: "Alice", status: "Active" },
    { id: "hw-2", name: "Dock", owner: "Bob", status: "Inactive" },
  ]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) return;
    setItems((prev) => [...prev, { id: `hw-${Date.now()}`, name, owner, status: "Active" }]);
    setName("");
    setOwner("");
    setShow(false);
    notify("Hardware added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Hardware</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New device
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Device" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.owner}</div>
              </div>
            </div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{i.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
