import { useState } from "react";
import { Mail, Plus, Trash2, Eye, Code } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Template { id: string; name: string; subject: string; body: string; }

export function EmailTemplatesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Template[]>([
    { id: "et-1", name: "Welcome email", subject: "Welcome to TrackForge, {{name}}!", body: "Hi {{name}},\n\nThanks for joining. Get started with your first project." },
    { id: "et-2", name: "Issue assigned", subject: "{{issueKey}} assigned to you", body: "You have been assigned to {{issueKey}}: {{summary}}" },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState<Template | null>(null);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { id: `et-${Date.now()}`, name, subject: "", body: "" }]);
    setName(""); setShow(false); notify("Template created");
  };
  const update = (id: string, field: keyof Template, val: string) => {
    setItems((p) => p.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };
  const remove = (id: string) => { setItems((p) => p.filter((t) => t.id !== id)); notify("Template deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Email templates</h1>
          <p className="text-sm text-slate-500">{items.length} templates · Use {"{{name}}"} for variables</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New template
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"><Mail className="h-4 w-4" /></div>
                  <span className="font-bold text-slate-900">{t.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPreview(t)} className="rounded-lg bg-slate-100 p-1.5 text-slate-600 transition-all hover:bg-slate-200"><Eye className="h-4 w-4" /></button>
                  <button onClick={() => remove(t.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <input value={t.subject} onChange={(e) => update(t.id, "subject", e.target.value)} placeholder="Subject line" className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
              <textarea value={t.body} onChange={(e) => update(t.id, "body", e.target.value)} placeholder="Email body..." rows={3} className="w-full resize-none rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2"><Code className="h-5 w-5 text-slate-700" /><h3 className="font-bold text-slate-900">Preview</h3></div>
          {preview ? (
            <div>
              <div className="mb-3 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">{preview.subject || "(no subject)"}</div>
              <div className="whitespace-pre-wrap rounded-lg border border-slate-200 p-4 text-sm text-slate-600">{preview.body || "(empty body)"}</div>
            </div>
          ) : <div className="py-16 text-center text-sm text-slate-400">Click the eye icon to preview</div>}
        </div>
      </div>
    </div>
  );
}
