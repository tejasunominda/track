import { useState } from "react";
import { FileText, Plus, Trash2, Eye, Type, AlignLeft, CheckSquare, ListChecks } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface FormField { id: string; label: string; type: "Text" | "Textarea" | "Checkbox" | "Select"; required: boolean; }
interface FormDef { id: string; name: string; fields: FormField[]; submissions: number; }

const fIcon = { Text: Type, Textarea: AlignLeft, Checkbox: CheckSquare, Select: ListChecks };

export function FormsPage() {
  const { notify } = useToast();
  const [forms, setForms] = useState<FormDef[]>([
    { id: "f-1", name: "Bug report form", fields: [
      { id: "ff-1", label: "Title", type: "Text", required: true },
      { id: "ff-2", label: "Description", type: "Textarea", required: true },
      { id: "ff-3", label: "Reproducible", type: "Checkbox", required: false },
    ], submissions: 42 },
    { id: "f-2", name: "Feature request", fields: [
      { id: "ff-4", label: "Feature name", type: "Text", required: true },
      { id: "ff-5", label: "Priority", type: "Select", required: false },
    ], submissions: 18 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState<FormDef | null>(null);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setForms((p) => [...p, { id: `f-${Date.now()}`, name, fields: [{ id: `ff-${Date.now()}`, label: "Name", type: "Text", required: true }], submissions: 0 }]);
    setName(""); setShow(false); notify("Form created");
  };
  const addField = (fid: string) => {
    setForms((p) => p.map((f) => (f.id === fid ? { ...f, fields: [...f.fields, { id: `ff-${Date.now()}`, label: "New field", type: "Text", required: false }] } : f)));
  };
  const updateField = (fid: string, ffid: string, key: keyof FormField, val: string | boolean) => {
    setForms((p) => p.map((f) => (f.id === fid ? { ...f, fields: f.fields.map((ff) => (ff.id === ffid ? { ...ff, [key]: val } : ff)) } : f)));
  };
  const removeField = (fid: string, ffid: string) => {
    setForms((p) => p.map((f) => (f.id === fid ? { ...f, fields: f.fields.filter((ff) => ff.id !== ffid) } : f)));
  };
  const remove = (id: string) => { setForms((p) => p.filter((f) => f.id !== id)); notify("Form deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Forms</h1>
          <p className="text-sm text-slate-500">{forms.length} forms · {forms.reduce((s, f) => s + f.submissions, 0)} submissions</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New form
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Form name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {forms.map((f) => (
            <div key={f.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><FileText className="h-4 w-4" /></div>
                  <div>
                    <span className="font-bold text-slate-900">{f.name}</span>
                    <div className="text-xs text-slate-500">{f.fields.length} fields · {f.submissions} submissions</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPreview(f)} className={`rounded-lg p-1.5 transition-all ${preview?.id === f.id ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}><Eye className="h-4 w-4" /></button>
                  <button onClick={() => remove(f.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="space-y-1.5">
                {f.fields.map((ff) => {
                  const Icon = fIcon[ff.type];
                  return (
                    <div key={ff.id} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                      <Icon className="h-4 w-4 text-slate-400" />
                      <input value={ff.label} onChange={(e) => updateField(f.id, ff.id, "label", e.target.value)} className="flex-1 rounded border border-transparent bg-transparent px-1 text-sm font-medium text-slate-700 outline-none focus:border-blue-500" />
                      <select value={ff.type} onChange={(e) => updateField(f.id, ff.id, "type", e.target.value)} className="rounded border border-slate-200 bg-white px-1 py-0.5 text-xs outline-none">
                        <option>Text</option><option>Textarea</option><option>Checkbox</option><option>Select</option>
                      </select>
                      <button onClick={() => updateField(f.id, ff.id, "required", !ff.required)} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${ff.required ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-400"}`}>{ff.required ? "REQ" : "OPT"}</button>
                      <button onClick={() => removeField(f.id, ff.id)} className="text-slate-300 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  );
                })}
                <button onClick={() => addField(f.id)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-blue-600 transition-all hover:bg-blue-50"><Plus className="h-3.5 w-3.5" /> Add field</button>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-bold text-slate-900">Preview</h3>
          {preview ? (
            <div className="space-y-3">
              {preview.fields.map((ff) => (
                <div key={ff.id}>
                  <label className="mb-1 flex items-center gap-1 text-xs font-bold text-slate-700">{ff.label}{ff.required && <span className="text-red-500">*</span>}</label>
                  {ff.type === "Text" && <input disabled placeholder={`Enter ${ff.label.toLowerCase()}`} className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm" />}
                  {ff.type === "Textarea" && <textarea disabled rows={2} placeholder={`Enter ${ff.label.toLowerCase()}`} className="w-full resize-none rounded-lg border border-slate-200 px-3 py-1.5 text-sm" />}
                  {ff.type === "Checkbox" && <input type="checkbox" disabled className="h-4 w-4 accent-blue-600" />}
                  {ff.type === "Select" && <select disabled className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm"><option>Option 1</option></select>}
                </div>
              ))}
            </div>
          ) : <div className="py-12 text-center text-sm text-slate-400">Click eye icon to preview</div>}
        </div>
      </div>
    </div>
  );
}
