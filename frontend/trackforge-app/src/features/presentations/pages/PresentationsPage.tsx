import { useState } from "react";
import { Presentation, Plus, Trash2, ChevronLeft, ChevronRight, SliceIcon } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Slide { id: string; title: string; body: string; }

export function PresentationsPage() {
  const { notify } = useToast();
  const [slides, setSlides] = useState<Slide[]>([
    { id: "s-1", title: "Welcome", body: "TrackForge Q1 Review" },
    { id: "s-2", title: "Highlights", body: "Shipped 50+ features\nOnboarded 3 enterprise customers\n99.9% uptime" },
    { id: "s-3", title: "Roadmap", body: "Q2: Mobile app, SSO, Advanced reports" },
  ]);
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSlides((p) => [...p, { id: `s-${Date.now()}`, title, body: "" }]);
    setTitle(""); setShow(false); setCurrent(slides.length); notify("Slide added");
  };
  const update = (field: "title" | "body", val: string) => {
    setSlides((p) => p.map((s, i) => (i === current ? { ...s, [field]: val } : s)));
  };
  const remove = (idx: number) => {
    setSlides((p) => p.filter((_, i) => i !== idx));
    if (current >= slides.length - 1) setCurrent(Math.max(0, current - 1));
    notify("Slide deleted");
  };

  const slide = slides[current];

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Presentations</h1>
          <p className="text-sm text-slate-500">{slides.length} slides</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New slide
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Slide title" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </form>
      )}
      <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
        <div className="space-y-1">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => setCurrent(i)} className={`group flex w-full items-center gap-2 rounded-lg p-2 text-left transition-all hover:bg-white ${i === current ? "bg-white shadow-sm ring-1 ring-blue-500" : ""}`}>
              <span className="flex h-8 w-12 items-center justify-center rounded bg-slate-200 text-xs font-bold text-slate-500">{i + 1}</span>
              <span className="flex-1 truncate text-sm font-medium text-slate-700">{s.title}</span>
              <Trash2 onClick={(e) => { e.stopPropagation(); remove(i); }} className="h-3.5 w-3.5 text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100" />
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {slide ? (
            <>
              <div className="mb-4 flex items-center gap-2 text-xs text-slate-400"><Presentation className="h-4 w-4" /> Slide {current + 1} of {slides.length}</div>
              <input value={slide.title} onChange={(e) => update("title", e.target.value)} className="mb-4 w-full border-b-2 border-slate-200 pb-2 text-2xl font-bold text-slate-900 outline-none focus:border-blue-500" />
              <textarea value={slide.body} onChange={(e) => update("body", e.target.value)} rows={8} className="w-full resize-none rounded-lg border border-slate-200 p-4 text-lg text-slate-700 outline-none focus:border-blue-500" placeholder="Slide content..." />
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Prev</button>
                <button onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))} disabled={current === slides.length - 1} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 disabled:opacity-40">Next <ChevronRight className="h-4 w-4" /></button>
              </div>
            </>
          ) : <div className="py-16 text-center text-slate-400"><SliceIcon className="mx-auto mb-2 h-10 w-10" /><p>No slides yet</p></div>}
        </div>
      </div>
    </div>
  );
}
