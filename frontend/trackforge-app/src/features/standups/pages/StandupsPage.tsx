import { useState } from "react";
import { Plus, Radio } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function StandupsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "su-1", person: "Alice", update: "Working on API" },
    { id: "su-2", person: "Bob", update: "UI polish" },
  ]);
  const [person, setPerson] = useState("");
  const [update, setUpdate] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!person.trim() || !update.trim()) return;
    setItems((prev) => [...prev, { id: `su-${Date.now()}`, person, update }]);
    setPerson("");
    setUpdate("");
    setShow(false);
    notify("Standup added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Standups</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New update
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={update} onChange={(e) => setUpdate(e.target.value)} placeholder="Update" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Radio className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.person}</div>
                <div className="text-xs text-slate-500">{i.update}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
