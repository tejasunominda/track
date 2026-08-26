import { useState } from "react";
import { Phone, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function OnCallPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "oc-1", person: "Alice", start: "2025-04-01", end: "2025-04-02" },
    { id: "oc-2", person: "Bob", start: "2025-04-03", end: "2025-04-04" },
  ]);
  const [person, setPerson] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!person.trim()) return;
    const now = new Date();
    const start = now.toISOString().split("T")[0];
    const end = new Date(now.setDate(now.getDate() + 1)).toISOString().split("T")[0];
    setItems((prev) => [...prev, { id: `oc-${Date.now()}`, person, start, end }]);
    setPerson("");
    setShow(false);
    notify("On-call added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">On-call</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.person}</div>
                <div className="text-xs text-slate-500">{i.start} → {i.end}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
