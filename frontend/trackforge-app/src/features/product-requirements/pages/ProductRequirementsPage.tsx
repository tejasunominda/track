import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ProductRequirementsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "prd-1", title: "Auth PRD", status: "Approved" },
    { id: "prd-2", title: "Search PRD", status: "Draft" },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((prev) => [...prev, { id: `prd-${Date.now()}`, title, status: "Draft" }]);
    setTitle("");
    setShow(false);
    notify("PRD created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Product requirements</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New PRD
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="PRD title" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <div className="font-medium text-slate-900">{i.title}</div>
            </div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{i.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
