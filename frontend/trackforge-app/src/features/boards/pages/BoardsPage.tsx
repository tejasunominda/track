import { useState } from "react";
import { Columns, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { Link } from "react-router-dom";

export function BoardsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "b-1", name: "Sprint board", projectId: "p-1" },
    { id: "b-2", name: "Roadmap board", projectId: "p-2" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `b-${Date.now()}`, name, projectId: "p-1" }]);
    setName("");
    setShow(false);
    notify("Board created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Boards</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New board
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Board name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Link key={i.id} to={`/projects/${i.projectId}/board`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 font-bold text-slate-900"><Columns className="h-5 w-5 text-slate-400" /> {i.name}</div>
            <div className="text-sm text-slate-500">Open board</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
