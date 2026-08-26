import { useState } from "react";
import { Fingerprint, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function CustomFieldsPage() {
  const { notify } = useToast();
  const [fields, setFields] = useState([
    { id: "cf-1", name: "Severity", type: "Select" },
    { id: "cf-2", name: "Customer", type: "Text" },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Text");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setFields((prev) => [...prev, { id: `cf-${Date.now()}`, name, type }]);
    setName("");
    notify("Custom field created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Custom fields</h1>
        <p className="text-sm text-slate-500">Define extra issue attributes.</p>
      </div>
      <form onSubmit={add} className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Field name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="Select">Select</option>
          <option value="Date">Date</option>
        </select>
        <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {fields.map((f) => (
          <div key={f.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Fingerprint className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{f.name}</div>
                <div className="text-xs text-slate-500">{f.type}</div>
              </div>
            </div>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">{f.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
