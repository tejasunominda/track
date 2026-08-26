import { useState } from "react";
import { Plus, Rocket } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function DeploymentsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "d-1", name: "Build 99", env: "Staging", status: "Success" },
    { id: "d-2", name: "Build 98", env: "Production", status: "Failed" },
  ]);
  const [name, setName] = useState("");
  const [env, setEnv] = useState("Staging");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `d-${Date.now()}`, name, env, status: "Pending" }]);
    setName("");
    setShow(false);
    notify("Deployment created");
  };

  const promote = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, env: "Production", status: "Success" } : i)));
    notify("Deployment promoted");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Deployments</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New build
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Build" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={env} onChange={(e) => setEnv(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="Staging">Staging</option>
            <option value="Production">Production</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.env}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Success" ? "bg-green-100 text-green-700" : i.status === "Failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{i.status}</span>
              {i.env !== "Production" && (
                <button onClick={() => promote(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Promote</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
