import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function LeadsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "l-1", name: "Qualified", email: "lead@example.com", status: "Qualified" },
    { id: "l-2", name: "New lead", email: "new@example.com", status: "New" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setItems((prev) => [...prev, { id: `l-${Date.now()}`, name, email, status: "New" }]);
    setName("");
    setEmail("");
    setShow(false);
    notify("Lead created");
  };

  const qualify = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Qualified" } : i)));
    notify("Lead qualified");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New lead
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Qualified" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{i.status}</span>
              {i.status !== "Qualified" && (
                <button onClick={() => qualify(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Qualify</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
