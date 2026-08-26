import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function TeamsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "t-1", name: "DevOps", members: 5 },
    { id: "t-2", name: "Frontend", members: 8 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `t-${Date.now()}`, name, members: 0 }]);
    setName("");
    setShow(false);
    notify("Team created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Teams</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New team
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Team name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 font-bold text-slate-900"><Users className="h-5 w-5 text-slate-400" /> {i.name}</div>
            <div className="text-sm text-slate-500">{i.members} members</div>
          </div>
        ))}
      </div>
    </div>
  );
}
