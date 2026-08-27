import { useState } from "react";
import { CheckSquare, Square, Plus, ListChecks, Trash2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Checklist { id: string; name: string; items: { id: string; text: string; done: boolean }[]; }

export function ChecklistsPage() {
  const { notify } = useToast();
  const [lists, setLists] = useState<Checklist[]>([
    { id: "cl-1", name: "Release checklist", items: [
      { id: "i1", text: "Run tests", done: true },
      { id: "i2", text: "Update changelog", done: false },
    ]},
    { id: "cl-2", name: "Onboarding", items: [
      { id: "i3", text: "Create account", done: true },
      { id: "i4", text: "Assign mentor", done: false },
    ]},
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const addList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLists((p) => [...p, { id: `cl-${Date.now()}`, name, items: [] }]);
    setName(""); setShow(false); notify("Checklist created");
  };
  const addItem = (listId: string, text: string) => {
    if (!text.trim()) return;
    setLists((p) => p.map((l) => (l.id === listId ? { ...l, items: [...l.items, { id: `i-${Date.now()}`, text, done: false }] } : l)));
  };
  const toggle = (listId: string, itemId: string) => {
    setLists((p) => p.map((l) => (l.id === listId ? { ...l, items: l.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)) } : l)));
  };
  const removeList = (id: string) => { setLists((p) => p.filter((l) => l.id !== id)); notify("Checklist deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Checklists</h1>
          <p className="text-sm text-slate-500">{lists.length} checklists</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New checklist
        </button>
      </div>
      {show && (
        <form onSubmit={addList} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Checklist name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {lists.map((l) => {
          const done = l.items.filter((i) => i.done).length;
          return (
            <div key={l.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-blue-500" />
                  <span className="font-bold text-slate-900">{l.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{done}/{l.items.length}</span>
                  <button onClick={() => removeList(l.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mb-3 space-y-1">
                {l.items.map((i) => (
                  <button key={i.id} onClick={() => toggle(l.id, i.id)} className="flex w-full items-center gap-2 rounded-lg p-1.5 text-left transition-all hover:bg-slate-50">
                    {i.done ? <CheckSquare className="h-4 w-4 text-green-500" /> : <Square className="h-4 w-4 text-slate-400" />}
                    <span className={`text-sm ${i.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{i.text}</span>
                  </button>
                ))}
              </div>
              <AddItem onAdd={(t) => addItem(l.id, t)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddItem({ onAdd }: { onAdd: (t: string) => void }) {
  const [v, setV] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd(v); setV(""); }} className="flex gap-2">
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Add item..." className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
      <button type="submit" className="rounded-lg bg-slate-100 px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200"><Plus className="h-4 w-4" /></button>
    </form>
  );
}
