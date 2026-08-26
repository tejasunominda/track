import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function TrainingPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "tr-1", course: "Course 1", duration: "30m", status: "Completed" },
    { id: "tr-2", course: "Course 2", duration: "1h", status: "Enrolled" },
  ]);
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course.trim() || !duration.trim()) return;
    setItems((prev) => [...prev, { id: `tr-${Date.now()}`, course, duration, status: "Enrolled" }]);
    setCourse("");
    setDuration("");
    setShow(false);
    notify("Course enrolled");
  };

  const complete = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Completed" } : i)));
    notify("Course completed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Training</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Enroll
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.course}</div>
                <div className="text-xs text-slate-500">{i.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{i.status}</span>
              {i.status !== "Completed" && (
                <button onClick={() => complete(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Complete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
