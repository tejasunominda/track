import { useState } from "react";
import { FormInput, Plus, Trash2, Lock, Eye } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface FieldConfig { id: string; field: string; required: boolean; hidden: boolean; defaultValue: string; }

export function FieldConfigsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<FieldConfig[]>([
    { id: "fc-1", field: "Summary", required: true, hidden: false, defaultValue: "" },
    { id: "fc-2", field: "Priority", required: true, hidden: false, defaultValue: "Medium" },
    { id: "fc-3", field: "Story Points", required: false, hidden: false, defaultValue: "" },
    { id: "fc-4", field: "Internal Notes", required: false, hidden: true, defaultValue: "" },
  ]);
  const [field, setField] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!field.trim()) return;
    setItems((p) => [...p, { id: `fc-${Date.now()}`, field, required: false, hidden: false, defaultValue: "" }]);
    setField(""); setShow(false); notify("Field config added");
  };
  const toggle = (id: string, key: "required" | "hidden") => {
    setItems((p) => p.map((f) => (f.id === id ? { ...f, [key]: !f[key] } : f)));
    notify(`${key} toggled`);
  };
  const setDefault = (id: string, val: string) => {
    setItems((p) => p.map((f) => (f.id === id ? { ...f, defaultValue: val } : f)));
  };
  const remove = (id: string) => { setItems((p) => p.filter((f) => f.id !== id)); notify("Field config removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Field configs</h1>
          <p className="text-sm text-slate-500">{items.length} fields configured</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New field config
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={field} onChange={(e) => setField(e.target.value)} placeholder="Field name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-xs font-bold uppercase text-slate-500">
              <th className="px-4 py-3 text-left">Field</th>
              <th className="px-4 py-3 text-center">Required</th>
              <th className="px-4 py-3 text-center">Hidden</th>
              <th className="px-4 py-3 text-left">Default value</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((f) => (
              <tr key={f.id} className="group transition-all hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FormInput className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{f.field}</span>
                    {f.hidden && <Eye className="h-3.5 w-3.5 text-slate-400" />}
                    {f.required && <Lock className="h-3.5 w-3.5 text-amber-500" />}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggle(f.id, "required")} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-all hover:scale-105 ${f.required ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-400"}`}>{f.required ? "REQ" : "OPT"}</button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggle(f.id, "hidden")} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-all hover:scale-105 ${f.hidden ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-400"}`}>{f.hidden ? "HID" : "VIS"}</button>
                </td>
                <td className="px-4 py-3">
                  <input value={f.defaultValue} onChange={(e) => setDefault(f.id, e.target.value)} placeholder="—" className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm outline-none focus:border-blue-500" />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
