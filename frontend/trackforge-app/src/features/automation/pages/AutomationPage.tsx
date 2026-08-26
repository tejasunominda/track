import { useState } from "react";
import { Bot, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function AutomationPage() {
  const { notify } = useToast();
  const [rules, setRules] = useState([
    { id: "ar-1", name: "Assign bug to QA", trigger: "issue created", action: "set assignee to QA", active: true },
    { id: "ar-2", name: "Notify on status change", trigger: "status changed", action: "send email", active: false },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setRules((prev) => [...prev, { id: `ar-${Date.now()}`, name, trigger: "manual", action: "notify", active: true }]);
    setName("");
    setShow(false);
    notify("Automation rule created");
  };

  const toggle = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
    notify("Rule updated");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Automation</h1>
          <p className="text-sm text-slate-500">Rules that run when issues change.</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New rule
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rule name" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {rules.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{r.name}</div>
                <div className="text-xs text-slate-500">When <span className="font-medium">{r.trigger}</span> then <span className="font-medium">{r.action}</span></div>
              </div>
            </div>
            <button onClick={() => toggle(r.id)} className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all duration-150 hover:text-blue-700">
              {r.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
              {r.active ? "On" : "Off"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
