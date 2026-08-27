import { useState } from "react";
import { FileText, Plus, Trash2, Star, CheckCircle2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Survey { id: string; title: string; questions: number; responses: number; status: "Open" | "Closed"; rating: number; }

export function SurveysPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Survey[]>([
    { id: "sv-1", title: "Customer satisfaction Q1", questions: 5, responses: 42, status: "Open", rating: 4.2 },
    { id: "sv-2", title: "Onboarding feedback", questions: 3, responses: 18, status: "Closed", rating: 3.8 },
    { id: "sv-3", title: "Feature request poll", questions: 2, responses: 67, status: "Open", rating: 4.5 },
  ]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setItems((p) => [...p, { id: `sv-${Date.now()}`, title, questions: 1, responses: 0, status: "Open", rating: 0 }]);
    setTitle(""); setShow(false); notify("Survey created");
  };
  const toggle = (id: string) => {
    setItems((p) => p.map((s) => (s.id === id ? { ...s, status: s.status === "Open" ? "Closed" : "Open" } : s)));
    notify("Survey toggled");
  };
  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); notify("Survey deleted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surveys</h1>
          <p className="text-sm text-slate-500">{items.filter((s) => s.status === "Open").length} open · {items.reduce((s, x) => s + x.responses, 0)} total responses</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New survey
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Survey title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <div key={s.id} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md"><FileText className="h-4 w-4" /></div>
                <span className="font-bold text-slate-900">{s.title}</span>
              </div>
              <button onClick={() => remove(s.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
              <span>{s.questions} questions</span>·<span>{s.responses} responses</span>
            </div>
            {s.rating > 0 && (
              <div className="mb-3 flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-slate-700">{s.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">avg rating</span>
              </div>
            )}
            <button onClick={() => toggle(s.id)} className={`flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-bold transition-all hover:scale-[1.02] ${s.status === "Open" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <CheckCircle2 className="h-3.5 w-3.5" /> {s.status === "Open" ? "Close survey" : "Reopen"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
