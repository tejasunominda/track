import { useState } from "react";
import { Briefcase, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function JobDescriptionsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "jd-1", title: "Engineer", level: "Senior" },
    { id: "jd-2", title: "Designer", level: "Mid" },
  ]);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !level.trim()) return;
    setItems((prev) => [...prev, { id: `jd-${Date.now()}`, title, level }]);
    setTitle("");
    setLevel("");
    setShow(false);
    notify("Job description created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Job descriptions</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New JD
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">{i.level}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
